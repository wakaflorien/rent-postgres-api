import express from "express";
import session from "express-session";
import passport from "./config/passport";
import authRoutes from "./routes/auth.routes";
import propertyRoutes from "./routes/property.routes";
import { createUsersTable } from "./models/user.model";
import { createPropertiesTable } from "./models/property.model";
import { pool as db } from "./db/index";
import { isAuthenticated } from "./middleware/auth.middleware";
import { createBookingsTable } from "./models/booking.model";
import reviewRoutes from "./routes/review.route";
import bookingRoutes from "./routes/booking.routes";
import { createReviewTable } from "./models/review.model";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Initialize users table
createUsersTable(db);
createPropertiesTable(db);
createBookingsTable(db);
createReviewTable(db);

// CORS Configuration
const corsOptions = {
  origin: ['http://localhost:3001', 'http://127.0.0.1:3001'], // Allow both localhost and 127.0.0.1
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Origin', 'X-Requested-With', 'Accept', 'x-client-key', 'x-client-token', 'x-client-secret', 'Authorization'],
  credentials: true
};

// Apply CORS middleware with options
app.use(cors(corsOptions));

// Additional middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Add pre-flight handling for all routes
app.options('*', cors(corsOptions));

// Middleware
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,
  })
);

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/api/v1/auth", authRoutes);

app.use("/api/v1/property", propertyRoutes);
app.use("/api/v1/booking", bookingRoutes);
app.use("/api/v1/review", reviewRoutes);

// Public route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the API" });
});

// Protected route
app.get("/protected", isAuthenticated, (req, res) => {
  res.json({ message: "Access granted", user: req.user });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
