import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { full_name, email, password } = await request.json();
}
