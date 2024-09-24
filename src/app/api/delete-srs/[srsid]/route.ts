import dbConnect from "@/lib/dbConnect";
import { authOptions } from "../../auth/[...nextauth]/options";
import UserModel from "@/models/User";
import { User, getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import SRSModel from "@/models/SRS";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { srsid: string } }
) {
  const srsID = params.srsid;
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
  try {
      await SRSModel.findByIdAndDelete(srsID);
      return NextResponse.json(
        {
          success: true,
          message: "SRS Document Deleted",
        },
        {
          status: 200,
        }
      );
  } catch (error) {
    console.log("Error in delete srs route", error);

    return NextResponse.json(
      {
        success: false,
        message: "Error Deleting SRS Document",
      },
      {
        status: 500,
      }
    );
  }
}
