export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { authOptions } from "../auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import SRSModel from "@/models/SRS";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const session = await getServerSession(authOptions);
    const user = session?.user;

    if (!session || !session.user) {
      return NextResponse.json(
        {
          success: false,
          message: "Not Authenticated",
        },
        {
          status: 401,
        }
      );
    }

    const srs = await SRSModel.findOne({ owner: user?._id }).sort({ createdAt: -1 });

    if (!srs) {
      return NextResponse.json(
        {
          success: false,
          message: "No SRS found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(
      {
        success: true,
        status: srs.status,
        pdf_url: srs.pdf_url,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error checking SRS status", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}
