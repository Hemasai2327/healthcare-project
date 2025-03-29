import { Request, Response, NextFunction } from 'express';
import Report, { IReport } from '../models/report';
import path from 'path';
import fs from 'fs';
import { AppError } from '../middlewares/error.middleware';
import { AuthRequest } from '../middlewares/auth.middleware';

export class ReportController {
  static async uploadReport(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.file) {
        throw new AppError('No file uploaded', 400);
      }

      const { name, description } = req.body;
      if (!name || !description) {
        throw new AppError('Name and description are required', 400);
      }

      // Create new report
      const report = new Report({
        name,
        description,
        filePath: req.file.path,
        fileName: req.file.originalname,
        userId: req.user?.id
      });

      await report.save();

      res.status(201).json({
        success: true,
        report: {
          id: report._id,
          name: report.name,
          description: report.description,
          fileName: report.fileName
        }
      });
    } catch (error) {
      next(error);
    }
  }

  static async getReports(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const reports = await Report.find({ userId: req.user?.id }) as IReport[];
      
      res.json({
        success: true,
        reports: reports.map(report => ({
          id: report._id,
          name: report.name,
          description: report.description,
          fileName: report.fileName,
          createdAt: report.createdAt
        }))
      });
    } catch (error) {
      next(error);
    }
  }
}