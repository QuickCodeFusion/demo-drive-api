import { google } from 'googleapis';

const SCOPES = ['https://www.googleapis.com/auth/drive'];
// import credentials from '../../credentials.json';

const auth = new google.auth.JWT(
  'CREDENTIALS_FILE', //   credentials.client_email,
  undefined,
  'CREDENTIALS_FILE', //   credentials.private_key,
  SCOPES
);

const drive = google.drive({ version: 'v3', auth });

export default drive;
