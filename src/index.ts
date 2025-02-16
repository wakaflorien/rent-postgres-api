import express from 'express';
import session from 'express-session';
import passport from './config/passport';
import authRoutes from './routes/auth.routes';
import { createUsersTable } from './models/user.model';
import { pool as db } from './db/index';
import dotenv from 'dotenv';
import { isAuthenticated } from './middleware/auth.middleware';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize users table
createUsersTable(db);

// Middleware
app.use(express.json());
app.use(session({
secret: process.env.SESSION_SECRET!,
resave: false,
saveUninitialized: false,
}));

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/auth', authRoutes);

// Public route
app.get('/', (req, res) => {
res.json({ message: 'Welcome to the API' });
});

// Protected route
app.get('/protected', isAuthenticated, (req, res) => {
res.json({ message: 'Access granted', user: req.user });
});

app.listen(PORT, () => {
console.log(`Server is running on port ${PORT}`);
});

