import { Request, Response, NextFunction } from 'express';
import User from '../models/user';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { AppError } from '../middlewares/error.middleware';

interface RegisterData {
  email: string;
  password: string;
  name: string;
  phone: string;
}

interface LoginData {
  email: string;
  password: string;
}

export class AuthController {
  static async register(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password, name, phone } = req.body as RegisterData;
      
      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new AppError('User already exists', 400);
      }

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create new user
      const user = new User({
        email,
        password: hashedPassword,
        name,
        phone,
        role: 'user'
      });

      await user.save();
      
      // Generate JWT token
      const token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: '24h' }
      );

      res.status(201).json({
        success: true,
        token,
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
          phone: user.phone
        }
      });
    } catch (error) {
      next(error);
    }
  }

  static async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password } = req.body as LoginData;

      // Find user
      const user = await User.findOne({ email });
      if (!user) {
        throw new AppError('Invalid credentials', 401);
      }

      // Check password
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        throw new AppError('Invalid credentials', 401);
      }

      // Generate JWT token
      const token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: '24h' }
      );

      res.json({
        success: true,
        token,
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
          phone: user.phone
        }
      });
    } catch (error) {
      next(error);
    }
  }
}