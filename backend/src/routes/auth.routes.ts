import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import { isAuthenticated } from "../middleware/auth.middleware";
import { User } from "../models/user.model";
import { UserModel } from "../models/user.model";
const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    const token = jwt.sign(
      { userId: (req.user as User).id, role: (req.user as User).role },
      process.env.JWT_SECRET!,
      { expiresIn: "24h" }
    );
    res.redirect(`${process.env.FRONTEND_URL}/auth/success?token=${token}`);
  }
);

router.get("/logout", isAuthenticated, (req, res) => {
  req.logout(() => {
    res.redirect("/");
  });
});

// Protected route example
router.get("/profile", isAuthenticated, async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  const user = req.user as User;
  console.log(user, "user data");
  res.status(200).json({
    id: user.id,
    google_id: user.google_id,
    email: user.email,
    display_name: user.display_name,
    role: user.role,
    created_at: user.created_at,
  });
});

export default router;
