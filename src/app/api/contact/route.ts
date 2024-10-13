import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const user = process.env.SMTP_USER;
const pass = process.env.SMTP_PASSWORDS;

export const POST = async (req: Request) => {
  const { Name, Email, Message } = await req.json();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: user,
      pass,
    },
  });

  const mailOptions = {
    from: Email,
    to: user,
    subject: `Website Submission from ${Name}`,
    replyTo: Email,
    html: `
      <p>Name:</p>
      <p>  ${Name} </p>
      <p>Message:</p>
      <p>  ${Message} </p>
      <p>Email:</p>
      <p>  ${Email} </p>     
    `,
    // text: `${Message} Send from ${Email}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ status: "Ok" });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Error sending email" }, { status: 500 });
  }
};
