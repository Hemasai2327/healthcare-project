import { Request, Response, NextFunction } from 'express';
import { AppError } from './error.middleware';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_FILE_TYPES = ['application/pdf'];

export const validateFileUpload = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.file) {
    return next(new AppError('No file uploaded', 400));
  }

  // Check file size
  if (req.file.size > MAX_FILE_SIZE) {
    return next(new AppError('File size exceeds 10MB limit', 400));
  }

  // Check file type
  if (!ALLOWED_FILE_TYPES.includes(req.file.mimetype)) {
    return next(new AppError('Only PDF files are allowed', 400));
  }

  next();
};
