/* eslint-disable node/no-extraneous-import */
/* eslint-disable max-len */
import { google, drive_v3 } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';
import { Credentials} from 'google-auth-library/build/src/auth/credentials';
import fs from 'fs';
import path from 'path';
import readline from 'readline';

interface ICredentials {
  installed: {
    client_id: string;
    project_id: string;
    auth_uri: string;
    token_uri: string;
    auth_provider_x509_cert_url: string;
    client_secret: string;
    redirect_uris: string[];
  };
}

const SCOPES = ['https://www.googleapis.com/auth/drive'];
const TOKEN_PATH = path.join(__dirname, '../../token.json');
const CREDENTIALS_PATH = path.join(__dirname, '../../credentials.json');

const credentials: ICredentials = JSON.parse(fs.readFileSync(CREDENTIALS_PATH, 'utf-8')) as ICredentials;
const { client_secret, client_id, redirect_uris } = credentials.installed;

const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

// Load token from file, or get new token
fs.readFile(TOKEN_PATH, (err, token) => {
  if (err) return getNewToken(oAuth2Client);
  oAuth2Client.setCredentials(JSON.parse(token.toString()) as Credentials);
});

function getNewToken(oAuth2Client: OAuth2Client) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) {
        console.error('Error retrieving access token', err);
        return;
      }
      oAuth2Client.setCredentials(token!);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
    });
  });
}

const drive: drive_v3.Drive = google.drive({ version: 'v3', auth: oAuth2Client });

export default drive;
