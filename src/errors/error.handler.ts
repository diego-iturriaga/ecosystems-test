import { Application, Request, Response, NextFunction } from 'express';
import { NotFoundError, ApplicationError } from './app.errors';

export default function (app: Application) {
  app.use(() => {
    throw new NotFoundError(JSON.stringify({error: 'Endpoint not found'}));
  });

  app.use((err: ApplicationError, _req: Request, res: Response, next: NextFunction) => {
    if (err instanceof ApplicationError) {
      if (err.message) {
        return res.status(err.code).send(err.message);
      } else {
        return res.sendStatus(err.code);
      }
    }

    next(err);
  });

  app.use(function onError(err: Error, _req: Request, res: Response, _next: NextFunction) {
    res.statusCode = 500;
    res.end(err.message + '\n');
  });
}
