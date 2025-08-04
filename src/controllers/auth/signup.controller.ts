import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { prisma } from "../../config/prisma";
import { sendMail } from "../../utils/mailer";
import { randomBytes } from "crypto";
import { BASE_URL } from "../../config/constants";
import { VerifyEmail } from "../../emails/VerifyEmail";

export const signup = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({ message: "Missing name, email or password" });
  }

  const normalizedEmail = email.toLowerCase().trim();

  const existingUser = await prisma.user.findUnique({
    where: { email: normalizedEmail },
  });

  if (existingUser) {
    return res.status(400).json({ message: "Email already in use" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  const token = randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60); // 1 hour

  // Save verification token
  await prisma.verificationToken.create({
    data: {
      token,
      userId: user.id,
      expiresAt,
    },
  });

  // Send verification email

  const verificationUrl = `${BASE_URL}/verify-email?token=${token}`;

  await sendMail({
    to: user.email,
    subject: "Verify your email address",
    react: VerifyEmail({
      name: user.name,
      verificationUrl,
    }),
  });

  res.status(201).json({
    message: "Signup successful, Please check your email to verify.",
    user: { id: user.id, email: user.email },
  });
};
