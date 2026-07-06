import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "ok",
    service: "au-tam-app",
    timestamp: new Date().toISOString(),
  });
}
