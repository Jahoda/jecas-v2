import { DATABASE_URL } from '$env/static/private';
import mysql from 'mysql2';
const connection = mysql.createConnection(DATABASE_URL);
console.log('Connected to PlanetScale!');
connection.end();
