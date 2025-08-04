import { Request, Response } from "express";

export const logout = (req: Request, res: Response) => {
  req.session.destroy(() => {
    res.clearCookie("exa-session");
    res.status(200).json({ message: "Logged out successfully" });
  });
};
