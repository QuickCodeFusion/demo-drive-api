import { promises as fs } from 'fs';
import * as path from 'path';
import * as process from 'process';
import { google, drive_v3, Auth } from 'googleapis';

const SCOPES = [
  'https://www.googleapis.com/auth/drive',
];

/**
 * Load service account credentials from environment variable.
 *
 * @return {Auth.JWT}
 */
function loadServiceAccountCredentials(): Auth.JWT {
  const encodedCredentials = process.env.SERVICE_ACCOUNT_KEY;
  if (!encodedCredentials) {
    throw new Error('SERVICE_ACCOUNT_KEY environment variable not set');
  }

  const credentialsBuffer = Buffer.from(encodedCredentials, 'base64');
  const credentials = JSON.parse(credentialsBuffer.toString('utf-8'));

  const client = new google.auth.JWT(
    credentials.client_email,
    undefined,
    credentials.private_key,
    SCOPES,
    undefined
  );

  return client;
}

/**
 * Initializes and returns the Google Drive service.
 * @return {Promise<drive_v3.Drive>}
 */
async function initializeDrive(): Promise<drive_v3.Drive> {
  const authClient = loadServiceAccountCredentials();
  await authClient.authorize();
  return google.drive({ version: 'v3', auth: authClient });
}

export const drive = initializeDrive();
