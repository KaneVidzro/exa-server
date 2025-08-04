import { Request, Response } from "express";
import { sendMail } from "../../utils/mailer";
import { prisma } from "../../config/prisma";
import { randomBytes } from "crypto";
import { BASE_URL } from "../../config/constants";
import { ForgotPasswordEmail } from "../../emails/ForgotPasswordEmail";

export const forgot = async (req: Request, res: Response) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Missing email" });
  }

  const normalizedEmail = email.toLowerCase().trim();

  const user = await prisma.user.findUnique({
    where: { email: normalizedEmail },
  });

  if (!user) {
    return res
      .status(404)
      .json({ message: "If the email exists, a reset link has been sent" });
  }

  // delete any existing recovery tokens for this user
  await prisma.passwordResetToken.deleteMany({
    where: { id: user.id },
  });

  const token = randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 1);

  await prisma.passwordResetToken.create({
    data: {
      token,
      userId: user.id,
      expiresAt,
    },
  });

  const resetUrl = `${BASE_URL}/reset-password?token=${token}`;

  await sendMail({
    to: user.email,
    subject: "Password Reset Request",
    react: ForgotPasswordEmail({
      name: user.name,
      resetUrl,
    }),
  });

  res.status(200).json({
    message: "Password recovery email sent ✅",
    user: { id: user.id, email: user.email },
  });
};
