/* eslint-disable max-len */
import { Router } from 'express';
import  Paths  from '../constants/Paths';
import FileController from '../services/fileServices';

const apiRouter = Router();

apiRouter.get( Paths.Files.Get, (req, res) => FileController.getFile(req, res));

apiRouter.post( Paths.Files.Add, (req, res) => FileController.uploadFile(req, res));

apiRouter.put( Paths.Files.Update, (req, res) => FileController.updateFile(req, res));

apiRouter.delete( Paths.Files.Delete, (req, res) => FileController.deleteFile(req, res));

export default apiRouter;
