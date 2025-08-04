import { Request, Response } from "express";
import { prisma } from "../../config/prisma";
import { sendMail } from "../../utils/mailer";
import { BASE_URL } from "../../config/constants";
import { VerifiedSuccessEmail } from "../../emails/VerifiedSuccess";

export const verify = async (req: Request, res: Response) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ message: "Missing token or email" });
  }

  const verifyToken = await prisma.verificationToken.findUnique({
    where: { token },
    include: { user: true },
  });

  if (!verifyToken || verifyToken.expiresAt < new Date()) {
    return res.status(404).json({ message: "Invalid or expired token" });
  }

  await prisma.user.update({
    where: { id: verifyToken.userId },
    data: { emailVerified: new Date() },
  });

  await prisma.verificationToken.delete({
    where: { token },
  });

  const dashboardUrl = `${BASE_URL}/explore`;

  // 6. Send confirmation email
  await sendMail({
    to: verifyToken.user.email,
    subject: "Thanks for verifying your account",
    react: VerifiedSuccessEmail({
      name: verifyToken.user.name,
      dashboardUrl,
    }),
  });

  return res.status(200).json({ message: "Email verified successfully" });
};
