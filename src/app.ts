import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import notFound from './app/middlewares/notFound';
import router from './app/routes';
import { globalErrorHandler } from './app/middlewares/globalErrorHandler';

const app: Application = express();

//middleware
app.use(express.json());
app.use(cors());

//application routes

app.use('/api', router);

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'success',
    message: 'Welcome To My Universe!!',
  });
});

//global error handler
app.use(globalErrorHandler);

//not found routes
app.use(notFound);

export default app;
