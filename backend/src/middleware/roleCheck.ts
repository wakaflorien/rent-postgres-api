import { Request, Response, NextFunction } from 'express';
import { UserRole } from '../models/user.model';

export interface AuthenticatedRequest extends Request {
user?: {
    id: string;
    email: string;
    role: UserRole;
    name: string;
};
}

class ForbiddenError extends Error {
constructor(message: string) {
    super(message);
    this.name = 'ForbiddenError';
}
}

export const isHost = (
req: AuthenticatedRequest,
res: Response,
next: NextFunction
) => {
try {
    if (!req.user) {
    throw new ForbiddenError('Authentication required');
    }

    if (req.user.role !== UserRole.HOST) {
    throw new ForbiddenError('Host access required');
    }

    next();
} catch (error) {
    if (error instanceof ForbiddenError) {
    res.status(403).json({
        status: 'error',
        message: error.message
    });
    } else {
    next(error);
    }
}
};

export const isRenter = (
req: AuthenticatedRequest,
res: Response,
next: NextFunction
) => {
try {
    if (!req.user) {
    throw new ForbiddenError('Authentication required');
    }

    if (req.user.role !== UserRole.RENTER) {
    throw new ForbiddenError('Renter access required');
    }

    next();
} catch (error) {
    if (error instanceof ForbiddenError) {
    res.status(403).json({
        status: 'error',
        message: error.message
    });
    } else {
    next(error);
    }
}
};

