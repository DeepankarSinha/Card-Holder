import dotenv from 'dotenv';
import { resolve } from 'path';
import { start } from './app';

dotenv.config({ path: resolve(__dirname, '../config.env') });

// Bootstrap the application.
start();