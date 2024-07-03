import { Router } from 'express';
import fileController from '../controllers/fileController';
import upload from '../config/multerConfig';
import Paths from '@src/constants/Paths';

const router = Router();

router.post(Paths.Files.Add,
  upload.single('file'),
  (req, res) => fileController.uploadFile(req, res));

router.get(Paths.Files.Get,
  (req, res) => fileController.getFile(req, res));

router.put(Paths.Files.Update,
  upload.single('file'),
  (req, res) => fileController.updateFile(req, res));

router.delete(Paths.Files.Delete,
  (req, res) => fileController.deleteFile(req, res));

router.get(Paths.Files.Folder,
  (req, res) => fileController.listFilesInFolder(req, res));

router.get('/folder/:parentId/folders',
  (req, res) => fileController.listFoldersInLocation(req, res));

router.get('/folderByName/:name',
  (req, res) => fileController.getFolderIdByName(req, res));
export default router;
