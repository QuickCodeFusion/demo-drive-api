/* eslint-disable max-len */
import { Request, Response } from 'express';
import googleDriveService from './googleDriveService';

class FileController {
  public async uploadFile(req: Request, res: Response) {
    try {
      const { name, mimeType }: { name: string; mimeType: string } = req.body as { name: string; mimeType: string };
      const file = req.files?.file;

      if (!file) {
        return res.status(400).send('No file uploaded');
      }

      const result = await googleDriveService.uploadFile(name, mimeType, file.data);
      res.status(201).json(result);
    } catch (error: unknown) {
      if(error instanceof Error) {
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
      const { mimeType } = req.body;
      const file = req.files?.file;

      if (!file) {
        return res.status(400).send('No file uploaded');
      }

      const result = await googleDriveService.updateFile(id, mimeType, file.data);
      res.status(200).json(result);
    } catch (error) {
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
