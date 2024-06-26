/* eslint-disable max-len */
import { Request, Response } from 'express';
import googleDriveService from '../services/googleDriveService';

class FileController {
  public async uploadFile(req: Request, res: Response) {
    try {
      const { file } = req;
      
      if (!file) {
        return res.status(400).send('No file uploaded');
      }
      const { originalname, mimetype, buffer } = file;
        
      const result = await googleDriveService.uploadFile(originalname, mimetype, buffer);
      res.status(201).json(result);
    } catch (error: unknown) {
      if(error instanceof Error) {
        console.error(error);
        res.status(500).send(error.message);
      }
    }
  }

  public async getFile(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const fileStream = await googleDriveService.getFile(id);
      fileStream.pipe(res);
    } catch (error: unknown) {
      if(error instanceof Error) {
        res.status(500).send(error.message);
      }
    }
  }

  public async updateFile(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { mimetype } = req.body as { mimetype: string };
      const { file } = req;

      if (!file) {
        return res.status(400).send('No file uploaded');
      }

      const result = await googleDriveService.updateFile(id, mimetype, file.buffer);
      res.status(200).json(result);
    } catch (error: unknown) {
      if(error instanceof Error) {
        res.status(500).send(error.message);
      }
    }
  }

  public async deleteFile(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await googleDriveService.deleteFile(id);
      res.status(204).send();
    } catch (error: unknown) {
      if(error instanceof Error) {
        res.status(500).send(error.message);
      }
    }
  }
}

export default new FileController();
