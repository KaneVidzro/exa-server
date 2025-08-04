import { Request, Response } from "express";
import { sendMail } from "../../utils/mailer";
import { prisma } from "../../config/prisma";
import bcrypt from "bcryptjs";
import { BASE_URL } from "../../config/constants";
import { ResetPasswordEmail } from "../../emails/ResetPasswordEmail";

export const reset = async (req: Request, res: Response) => {
  const { token, newPassword } = req.body;

  if (!token || !newPassword) {
    return res.status(400).json({ message: "Missing token or password" });
  }

  // 1. Find recovery token
  const resetTokenRecord = await prisma.passwordResetToken.findUnique({
    where: { token },
    include: { user: true },
  });

  if (!resetTokenRecord || resetTokenRecord.expiresAt < new Date()) {
    return res.status(404).json({ message: "Invalid or expired token" });
  }

  // 4. Hash and update new password
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await prisma.$transaction([
    prisma.user.update({
      where: { id: resetTokenRecord.userId },
      data: { password: hashedPassword },
    }),
    prisma.passwordResetToken.delete({
      where: { token },
    }),
  ]);

  const loginUrl = `${BASE_URL}/auth/login`;

  // 6. Send confirmation email
  await sendMail({
    to: resetTokenRecord.user.email,
    subject: "Password successfully reset",
    react: ResetPasswordEmail({
      name: resetTokenRecord.user.name,
      loginUrl,
    }),
  });

  // 7. Respond
  res.status(200).json({
    message: "Password reset successful",
  });
};
