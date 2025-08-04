import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { prisma } from "../../config/prisma";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Missing email or password" });
  }

  const normalizedEmail = email.toLowerCase().trim();

  const user = await prisma.user.findUnique({
    where: { email: normalizedEmail },
  });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  if (!user.emailVerified) {
    return res.status(400).json({ message: "Email not verified" });
  }

  /**
   * Set user session
   * This creates a session for the user
   * and
   * stores their user ID in the session.
   */
  req.session.userId = user.id;

  res.status(200).json({
    message: "Login successful",
    user: { id: user.id, email: user.email },
  });
};
