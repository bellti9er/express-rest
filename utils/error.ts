import { Request, Response, NextFunction } from 'express'

export const wrapAsync = (func: (req: Request, res: Response, next?: NextFunction) => Promise<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    func(req, res, next).catch((err) => next(err))
  }
}

export const errorHandler = (err: any, req: Request, res:Response, next: NextFunction) => {
  console.error(err.stack)

  err.statusCode = err.statusCode || 500;
  
  return res.status(err.statusCode).json({ message: err.message });
}

export class CustomError extends Error {
  public statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
  }
}
