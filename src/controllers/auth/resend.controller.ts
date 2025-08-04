import { Request, Response } from "express";
import { sendMail } from "../../utils/mailer";
import { prisma } from "../../config/prisma";
import { randomBytes } from "crypto";
import { BASE_URL } from "../../config/constants";
import { VerifyEmail } from "../../emails/VerifyEmail";

export const resend = async (req: Request, res: Response) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Missing email" });
  }

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (user.emailVerified) {
    return res.status(400).json({ message: "User already verified" });
  }

  await prisma.verificationToken.deleteMany({
    where: { id: user.id },
  });

  const token = randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60);

  await prisma.verificationToken.create({
    data: {
      token,
      userId: user.id,
      expiresAt,
    },
  });

  const verificationUrl = `${BASE_URL}/verify-email?token=${token}`;

  await sendMail({
    to: user.email,
    subject: "Verify your email address",
    react: VerifyEmail({
      name: user.name,
      verificationUrl,
    }),
  });

  res.status(200).json({ message: "Verification email sent" });
};
