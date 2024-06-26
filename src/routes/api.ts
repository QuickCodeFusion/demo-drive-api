/* eslint-disable max-len */
import { Router } from 'express';
import  Paths  from '../constants/Paths';
import FilesRouter from './fileRoutes';

const apiRouter = Router();

apiRouter.use(Paths.Files.Base, FilesRouter);

export default apiRouter;
