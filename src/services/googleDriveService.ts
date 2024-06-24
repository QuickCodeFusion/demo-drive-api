import drive from '../config/googleDrive';

class GoogleDriveService {
  public async uploadFile(name: string, mimeType: string, body: Buffer) {
    const response = await drive.files.create({
      requestBody: {
        name,
        mimeType,
      },
      media: {
        mimeType,
        body,
      },
    });
    return response.data;
  }

  public async getFile(fileId: string) {
    const response = await drive.files.get({
      fileId,
      alt: 'media',
    }, {
      responseType: 'stream',
    });

    return response.data;
  }

  public async updateFile(fileId: string, mimeType: string, body: Buffer) {
    const response = await drive.files.update({
      fileId,
      media: {
        mimeType,
        body,
      },
    });
    return response.data;
  }

  public async deleteFile(fileId: string) {
    await drive.files.delete({ fileId });
  }
}

export default new GoogleDriveService();
