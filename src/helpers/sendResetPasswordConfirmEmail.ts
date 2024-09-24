import { render } from '@react-email/render';
import { APIResponse } from "@/types/APIResponse";
import nodemailer from "nodemailer"
import ResetPasswordConfirmEmail from '../../emails/ResetConfirmEmail';

export async function sendResetPasswordConfirmmail(
  username:string,
  email:string,
  updatedDate:Date
): Promise<APIResponse> {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      port: 465,
      secure: true,
      auth: {
        user: "contact.akshat.jaiswal@gmail.com",
        pass: "vyhhnbphhwgesbbg",
      },
    });
    const emailHtml = render(ResetPasswordConfirmEmail({ username, updatedDate}))

    const sendMessage = async()=>{
    const result = await transporter.sendMail({
      from: '"Blueprint.AI" <contact.akshat.jaiswal@gmail.com>', 
      to: email,
      subject: "You updated the password for your Blueprint.AI account", 
      html:  emailHtml,
      // attachments: [
      //   {
      //     filename: "SRS.png",
      //     path: `${process.env.NEXT_PUBLIC_URL}/SRS.png`,
      //     cid: "uniq-SRS.png",
      //   },
      // ],
    });
  }
  await sendMessage();

    return { success: true, message: "Reset Password Confirm Email Sent Successfully" };
  } catch (error) {
    console.log("Error sending email", error);
    return { success: false, message: "Failed to Send Reset Password Confirm Email" };
  }
}
