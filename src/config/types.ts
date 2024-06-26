/* eslint-disable node/no-extraneous-import */
import { JSONClient } from 'google-auth-library/build/src/auth/googleauth';
import { OAuth2Client } from 'google-auth-library/build/src/auth/oauth2client';

export interface JWTInput {
    type?: string;
    client_email?: string;
    private_key?: string;
    private_key_id?: string;
    project_id?: string;
    client_id?: string;
    client_secret?: string;
    refresh_token?: string;
    quota_project_id?: string;
}

export type TJSONClient = OAuth2Client;