import dotenv from 'dotenv';
import { resolve } from 'path';
import { start } from './app';

// Setup file to resolve environment variable. Dotenv makes it easier.
dotenv.config({ path: resolve(__dirname, '../config.env') });

// Bootstrap the application.
start();