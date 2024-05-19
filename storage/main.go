package storage

import (
	"context"
	"database/sql"
	_ "embed"
	"log"
	"os"
	"os/user"
	"path"
	"path/filepath"

	qr "app/storage/db"

	_ "github.com/mattn/go-sqlite3"
)

var ddl = `
CREATE TABLE IF NOT EXISTS Client (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    firstName TEXT NOT NULL,
    lastName TEXT NOT NULL,
    fathersName TEXT NOT NULL,
    title TEXT NOT NULL,
    ipn TEXT NOT NULL,
    address TEXT NOT NULL,
    account TEXT NOT NULL,
    phone TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS Document (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    executorId INTEGER NOT NULL,
    contractorId INTEGER NOT NULL ,
    date TEXT NOT NULL,
    title TEXT NOT NULL,
    FOREIGN KEY (executorId) REFERENCES Client(id),
    FOREIGN KEY (contractorId) REFERENCES Client(id)
);

CREATE TABLE IF NOT EXISTS DocTransaction (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    documentId INTEGER NOT NULL,
    amount TEXT NOT NULL,
    FOREIGN KEY (documentId) REFERENCES Document(id)
);
`

func InitDB() (*qr.Queries, *sql.DB, error) {
	ctx := context.Background()

	trgPath, err := createTrgDirectory()

	if err != nil {
		log.Println("CREATE DIR", err)
		return nil, nil, err
	}

	database, err := sql.Open("sqlite3", path.Join(trgPath, "db.sqlite"))
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

func createTrgDirectory() (string, error) {
	// Get current user's information
	currentUser, err := user.Current()
	if err != nil {
		return "", err
	}

	// Get the home directory of the current user
	homeDir := currentUser.HomeDir

	// Create the path for the .trg directory
	trgDirPath := filepath.Join(homeDir, ".trg")

	// Check if the directory already exists
	if _, err := os.Stat(trgDirPath); os.IsNotExist(err) {
		// Create the .trg directory
		if err := os.Mkdir(trgDirPath, 0755); err != nil {
			return "", err
		}
	}

	return trgDirPath, nil
}
