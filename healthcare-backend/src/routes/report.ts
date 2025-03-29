import express, { Response, NextFunction } from 'express';
import { ReportController } from '../controllers/report';
import multer from 'multer';
import { authMiddleware, validateFileUpload } from '../middlewares';
import { AuthRequest } from '../middlewares/auth.middleware';
import { RequestHandler } from 'express';

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ 
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(null, false);
      cb(new Error('Only PDF files are allowed'));
    }
  }
});

// Upload report route - protected and validated
router.post(
  '/upload',
  authMiddleware as RequestHandler,
  upload.single('file') as RequestHandler,
  validateFileUpload as RequestHandler,
  (async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      await ReportController.uploadReport(req, res, next);
    } catch (error) {
      next(error);
    }
  }) as RequestHandler
);

// Get all reports route - protected
router.get(
  '/',
  authMiddleware as RequestHandler,
  (async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      await ReportController.getReports(req, res, next);
    } catch (error) {
      next(error);
    }
  }) as RequestHandler
);

export default router;