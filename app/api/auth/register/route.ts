import { MakeRegister, checkByEmail } from "@/utils/models/register";
import { setCrypt } from "@/utils/services";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { full_name, email, password } = await request.json();
  //todo check fullname - email - pass length
  const check = await checkByEmail(email);
  if (check) {
    return NextResponse.json(
      { ok: false, message: "User already exist" },
      { status: 400 }
    );
  }
  const hashedPass = setCrypt(password);
  const data = await MakeRegister(full_name, email, hashedPass);
  if (!data) {
    return NextResponse.json(
      {
        ok: false,
        message: "Interval server error. Please try again later",
      },
      { status: 500 }
    );
  }
  return NextResponse.json(
    {
      ok: true,
      message: "Register successfully!",
      data: data,
    },
    { status: 200 }
  );
}
