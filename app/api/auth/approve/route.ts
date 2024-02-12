import { MakeApprove } from "@/utils/models/register";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { id } = await req.json();
  if (!id) {
    return NextResponse.json(
      {
        ok: false,
        message: "User information not provided!",
      },
      {
        status: 404,
      }
    );
  }
  const data = await MakeApprove(id);
  if (!data) {
    return NextResponse.json(
      {
        ok: false,
        message: "Interval server error",
      },
      {
        status: 500,
      }
    );
  }
  return NextResponse.json({
    ok: true,
    message: "User authentication done successfully!",
  });
}
