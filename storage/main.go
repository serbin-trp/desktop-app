package storage

import (
	"context"
	"database/sql"
	_ "embed"
	"log"

	qr "app/storage/db"

	_ "github.com/mattn/go-sqlite3"
)

var ddl = `
CREATE TABLE IF NOT EXISTS Client (
    id TEXT PRIMARY KEY,
    firstName TEXT NOT NULL,
    lastName TEXT NOT NULL,
    fathersName TEXT NOT NULL,
    clientId TEXT NOT NULL,
    title TEXT NOT NULL,
    ipn TEXT NOT NULL,
    address TEXT NOT NULL,
    account TEXT NOT NULL,
    phone TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS Document (
    id TEXT PRIMARY KEY,
    executorId TEXT NOT NULL,
    contractorId TEXT NOT NULL,
    date TEXT NOT NULL,
    title TEXT NOT NULL,
    FOREIGN KEY (executorId) REFERENCES Client(id),
    FOREIGN KEY (contractorId) REFERENCES Client(id)
);

CREATE TABLE IF NOT EXISTS DocTransaction (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    documentId TEXT NOT NULL,
    amount TEXT NOT NULL,
    FOREIGN KEY (documentId) REFERENCES Document(id)
);
`

func InitDB() (*qr.Queries, *sql.DB, error) {
	ctx := context.Background()
	database, err := sql.Open("sqlite3", "./db.sqlite")
	if err != nil {
		log.Println("OPEN ERROR", err)
		return nil, nil, err
	}

	// create tables
	if _, err := database.ExecContext(ctx, ddl); err != nil {
		log.Println("EXEC CONTEXT ERROR", err)
		return nil, nil, err
	}

	queries := qr.New(database)
	return queries, database, nil
}
