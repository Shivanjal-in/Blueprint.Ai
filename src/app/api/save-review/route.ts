export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { authOptions } from "../auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import SRSModel from "@/models/SRS";

export async function POST(req: NextRequest) {
  try {
    const { rating, praises } = await req.json();
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

    const srs = await SRSModel.findOne({ owner: user?._id }).sort({
      createdAt: -1,
    });
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
    if (rating) {
      srs.rating = rating;
    }
    if (praises) {
      srs.praise = praises;
    }
    srs.save();

    return NextResponse.json(
      {
        success: true,
        message: "Review Saved Successfully",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error saving review", error);
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
