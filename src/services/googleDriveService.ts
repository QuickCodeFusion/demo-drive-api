/* eslint-disable node/no-unsupported-features/node-builtins */
/* eslint-disable max-len */
import { Readable } from 'stream';
import { drive } from '../config/googleDrive';

class GoogleDriveService {
  public async uploadFile(name: string, mimeType: string, body: Buffer) {
    const driveClient = await drive;
    const response = await driveClient.files.create({
      requestBody: {
        name,
        mimeType,
      },
      media: {
        mimeType,
        body: Readable.from(body),
      },
    });
    return response.data;
  }

  public async getFile(fileId: string) {
    const driveClient = await drive;

    const fileMetadata = await driveClient.files.get({
      fileId,
      fields: 'name, mimeType',
    });

    const response = await driveClient.files.get({
      fileId,
      alt: 'media',
    }, {
      responseType: 'stream',
    });

    const fileName = fileMetadata.data.name || 'downloaded_file';
    const mimeType = fileMetadata.data.mimeType || 'application/octet-stream';
    
    return {
      name: fileName,
      mimeType: mimeType,
      stream: response.data,
    };
  }
  
  public async listFilesInFolder(folderId: string) {
    const driveInstance = await drive;
    const sharedFiles = await driveInstance.files.list({
      q: `sharedWithMe and trashed = false`,
      fields: 'nextPageToken, files(id, name, mimeType, kind)',
    });
    console.log(sharedFiles);
    const filesInMyDrive = await driveInstance.files.list({
      q: `'${folderId}' in parents and trashed = false`,
      fields: 'nextPageToken, files(id, name, mimeType, kind)',
    })
    if (folderId === 'root') {
      const allFiles = [...(sharedFiles?.data?.files || []), ...(filesInMyDrive.data.files || [])];
      return allFiles;
    }
    return filesInMyDrive.data.files;
  }

  public async getFolderIdByName(folderName: string) {
    const driveInstance = await drive;
    const res = await driveInstance.files.list({
      q: `mimeType='application/vnd.google-apps.folder' and name='${folderName}'`,
      fields: 'files(id, name)',
    });
    const folders = res.data.files;
    if (!folders || folders.length === 0) {
      throw new Error(`Folder with name '${folderName}' not found.`);
    }
    return folders[0].id;
  }

  public async updateFile(fileId: string, mimeType: string, body: Buffer) {
    const driveClient = await drive;
    const response = await driveClient.files.update({
      fileId,
      media: {
        mimeType,
        body,
      },
    });
    return response.data;
  }

  public async deleteFile(fileId: string) {
    const driveClient = await drive;
    await driveClient.files.delete({ fileId });
  }

  public async listFoldersInLocation(parentId: string) {
    const driveClient = await drive;
    // Search for owned folders in the specified location
    const resOwned = await driveClient.files.list({
      q: `'${parentId}' in parents and mimeType = 'application/vnd.google-apps.folder' and trashed = false`,
      fields: 'files(id, name)',
    });

    // Search for shared folders in the specified location
    const resShared = await driveClient.files.list({
      q: `mimeType = 'application/vnd.google-apps.folder' and sharedWithMe and trashed = false`,
      fields: 'files(id, name)',
    });

    if (parentId === 'root') {
    // Combine owned and shared folders
    const allFolders = [...(resOwned.data.files || []), ...(resShared.data.files || [])];
    return allFolders;
    }
    return resOwned.data.files;
  };
  public async exportDocFile(docId:string, exportMimeType:string = 'application/pdf') {
    const driveInstance = await drive;
    const docMetadata = await driveInstance.files.get({ fileId: docId, fields: 'name, mimeType' });
    const fileName = docMetadata.data.name || 'downloaded_file';
    const mimeType = docMetadata.data.mimeType || 'application/octet-stream';
    const res = await driveInstance.files.export({
      fileId: docId,
      mimeType: exportMimeType,
    },{
      responseType: 'stream',
    });
    return {
      name: fileName,
      mimeType,
      stream: res.data,
    }
  }
}

export default new GoogleDriveService();
