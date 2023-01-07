convert-db:
	./mysql2sqlite jecas.sql | sqlite3 mysqlite3.db