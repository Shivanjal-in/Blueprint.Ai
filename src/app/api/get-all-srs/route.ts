export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { authOptions } from "../auth/[...nextauth]/options";
import { User, getServerSession } from "next-auth";
import SRSModel from "@/models/SRS";

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    const session = await getServerSession(authOptions);
    const user: User = session?.user as User;
    if (!session || !session.user) {
      //! Means user is not logged in
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
    
    const srs = await SRSModel.find({ owner: user._id });

    if (srs.length===0) {
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
        SRSDocuments: srs.map((doc, index) => ({
          mongoID:doc._id,
          id: index + 1,
          name: doc.name,
          status: doc.status,
          created: doc.createdAt,
          pdf: doc.pdf_url,
          word: doc.word_url,
        })),
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
