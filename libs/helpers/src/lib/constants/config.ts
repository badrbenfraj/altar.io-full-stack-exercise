// import * as dotenv from 'dotenv';
// dotenv.config();

export const TYPEORM_CONFIG = 'database';

// Application
export const APP_PORT = process.env['APP_PORT'] || 3000;
export const BASE_API = String(process.env['BASE_API']);
export const CLIENT_URL = process.env['CLIENT_URL'];

// Database
export const DB_HOST = process.env['DB_HOST'] || 'localhost';
export const DB_PORT = parseInt(String(process.env['DB_PORT'])) || 5432;
export const DB_NAME = process.env['DB_NAME'] || 'altar';
export const DB_USER = process.env['DB_USER'] || 'username';
export const DB_PASS = String(process.env['DB_PASS']) || 'password';
export const DB_SYNC = Boolean(process.env['DB_SYNC']) || true;

// Keycloak
export const KEYCLOAK_HOST = process.env['KEYCLOAK_HOST'];
export const KEYCLOAK_PORT = process.env['KEYCLOAK_PORT'];
