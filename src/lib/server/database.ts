import { DATABASE_URL } from '$env/static/private';
import mysql from 'mysql2/promise';

export const connection = await mysql.createConnection(DATABASE_URL);
