## About

This project was created with [express-generator-typescript](https://github.com/seanpmaxwell/express-generator-typescript).

# API Documentation

### Upload File
- URL: /upload
- Method: POST
- Description: Uploads a file to Google Drive.
- Request Headers: Content-Type: multipart/form-data
- Request Body:
  - file: The file to upload.
- Response:
  - 201 Created: Returns the metadata of the uploaded file.
  - 400 Bad Request: If no file is uploaded.
  - 500 Internal Server Error: If an error occurs on the server.
- Example cURL:
    ```bash
    curl -X POST http://localhost:3000/upload \
      -F "file=@path/to/file"
    ```

### Get File
- URL: /file/:id
- Method: GET
- Description: Retrieves a file from Google Drive by its ID.
- URL Parameters:
  - id: The ID of the file to retrieve.
- Response:
  - 200 OK: Streams the file to the client.
  - 500 Internal Server Error: If an error occurs on the server.
- Example cURL:
    ```bash
    curl -O -J http://localhost:3000/file/1a2b3c4d
    ```

### Update File
- URL: /file/:id
- Method: PUT
- Description: Updates an existing file in Google Drive by its ID.
- Request Headers: Content-Type: multipart/form-data
- URL Parameters:
  - id: The ID of the file to update.
- Request Body:
  - file: The new file content.
  - mimetype: The MIME type of the file.
- Response:
  - 200 OK: Returns the metadata of the updated file.
  - 400 Bad Request: If no file is uploaded.
  - 500 Internal Server Error: If an error occurs on the server.
- Example cURL:
    ```bash
    curl -X PUT http://localhost:3000/file/1a2b3c4d \
      -F "file=@path/to/updated_file"
    ```

### Delete File
- URL: /file/:id
- Method: DELETE
- Description: Deletes a file from Google Drive by its ID.
- URL Parameters:
  - id: The ID of the file to delete.
- Response:
  - 204 No Content: If the file is deleted successfully.
  - 500 Internal Server Error: If an error occurs on the server.
- Example cURL:
    ```bash
    curl -X DELETE http://localhost:3000/file/1a2b3c4d
    ```

### List Files in Folder
- URL: /folder/:id/files
- Method: GET
- Description: Lists all files within a specific folder by folder ID.
- URL Parameters:
  - id: The ID of the folder to list files from.
- Response:
  - 200 OK: Returns a list of files in the folder.
  - 500 Internal Server Error: If an error occurs on the server.
- Example cURL:
    ```bash
    curl -X GET http://localhost:3000/folder/1a2b3c4d/files
    ```

### List Folders in Location
- URL: /folder/:parentId/folders
- Method: GET
- Description: Lists all folders within a specific parent folder by parent folder ID.
- URL Parameters:
  - parentId: The ID of the parent folder to list subfolders from.
- Response:
  - 200 OK: Returns a list of folders in the specified location.
  - 500 Internal Server Error: If an error occurs on the server.
- Example cURL:
    ```bash
    curl -X GET http://localhost:3000/folder/1a2b3c4d/folders
    ```

### Get Folder ID by Name
- URL: /folderByName/:name
- Method: GET
- Description: Retrieves the ID of a folder by its name.
- URL Parameters:
  - name: The name of the folder.
- Response:
  - 200 OK: Returns the ID of the folder.
  - 500 Internal Server Error: If an error occurs on the server.
- Example cURL:
    ```bash
    curl -X GET http://localhost:3000/folderByName/MyFolder
    ```

### Export File by ID
- URL: /export/:id
- Method: GET
- Description: Exports a Google Docs file as a specified MIME type.
- URL Parameters:
  - id: The ID of the file to export.
- Query Parameters:
  - mimeType: The MIME type to export the file as.
- Response:
  - 200 OK: Returns the exported file.
  - 400 Bad Request: If the id or mimeType are missing.
  - 500 Internal Server Error: If an error occurs on the server.
- Example cURL:
    ```bash
    curl -O -J "http://localhost:3000/export/1a2b3c4d?mimeType=application/pdf"
    ```

## Summary of Routes
- Upload File: POST /upload
- Get File: GET /file/:id
- Update File: PUT /file/:id
- Delete File: DELETE /file/:id
- List Files in Folder: GET /folder/:id/files
- List Folders in Location: GET /folder/:parentId/folders
- Get Folder ID by Name: GET /folderByName/:name
- Export File by ID: GET /export/:id

## Available Scripts

### `npm run dev`
Run the server in development mode.

### `npm test`
Run all unit-tests with hot-reloading.

### `npm test -- --testFile="name of test file" (i.e. --testFile=Users).`
Run a single unit-test.

### `npm run test:no-reloading`
Run all unit-tests without hot-reloading.

### `npm run lint`
Check for linting errors.

### `npm run build`
Build the project for production.

### `npm start`
Run the production build (Must be built first).

### `npm start -- --env="name of env file" (default is production).`
Run production build with a different env file.

## Additional Notes

- If `npm run dev` gives you issues with bcrypt on MacOS you may need to run: `npm rebuild bcrypt --build-from-source`.
