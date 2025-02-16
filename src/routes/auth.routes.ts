import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { isAuthenticated } from '../middleware/auth.middleware';

const router = express.Router();

router.get('/google',
passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback',
passport.authenticate('google', { failureRedirect: '/login' }),
(req, res) => {
    const token = jwt.sign(
    { userId: (req.user as any).id },
    process.env.JWT_SECRET!,
    { expiresIn: '24h' }
    );
    res.redirect(`/auth/success?token=${token}`);
}
);

router.get('/success', (req, res) => {
res.json({ message: 'Authentication successful' });
});

router.get('/logout', (req, res) => {
req.logout(() => {
    res.redirect('/');
});
});

// Protected route example
router.get('/profile', isAuthenticated, (req, res) => {
res.json(req.user);
});

export default router;

