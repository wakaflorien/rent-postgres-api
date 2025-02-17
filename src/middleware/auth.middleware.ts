import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
const authHeader = req.headers.authorization;

if (!authHeader) {
    return res.status(401).json({ message: 'No token provided' });
}

const token = authHeader.split(' ')[1];

try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    req.user = decoded;
    next();
} catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
}
};

export const isHost = (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    if (user?.role !== 'host') {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    next();
}   

export const isRenter = (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    if (user?.role !== 'renter') {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    next();
}
