import { NextFunction, Request, Response } from 'express';

export function logger(req: Request, res: Response, next: NextFunction) {
  const query = req.query.id ? req.query.id : null;
  console.log(`new request intercepted`);
  if (query) console.log(`get for query id = ${query}`);
  next();
}
