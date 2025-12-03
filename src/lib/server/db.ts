import mysql from 'mysql2/promise';

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
	throw new Error('DATABASE_URL environment variable is not set');
}

let connection: mysql.Connection | null = null;

export async function getConnection() {
	if (!connection) {
		connection = await mysql.createConnection(DATABASE_URL);
	}
	return connection;
}

export async function closeConnection() {
	if (connection) {
		await connection.end();
		connection = null;
	}
}
