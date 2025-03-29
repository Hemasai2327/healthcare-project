import express, { Response, NextFunction } from 'express';
import { AuthController } from '../controllers/auth';
import { AppError } from '../middlewares/error.middleware';

const router = express.Router();

// Register route
router.post('/register', async (req: express.Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await AuthController.register(req, res, next);
  } catch (error) {
    next(error);
  }
});

// Login route
router.post('/login', async (req: express.Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await AuthController.login(req, res, next);
  } catch (error) {
    next(error);
  }
});

export default router;