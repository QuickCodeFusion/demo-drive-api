import { Router } from 'express';
import  Paths  from '../constants/Paths';

const apiRouter = Router();

apiRouter.get( Paths.Files.Get, (req, res) => {
  
});

apiRouter.post( Paths.Files.Add, (req, res) => {
  
});

apiRouter.put( Paths.Files.Update, (req, res) => {
  
});

apiRouter.delete( Paths.Files.Delete, (req, res) => {
  
});

export default apiRouter;
