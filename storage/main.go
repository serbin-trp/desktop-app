package storage

import (
	"context"
	"database/sql"
	_ "embed"
	"log"
	"path"
	"strings"

	platform "app/os"
	qr "app/storage/db"

	_ "github.com/mattn/go-sqlite3"
)

//go:embed sqlc/schema.sql
var ddl string

func InitDB() (*qr.Queries, *sql.DB, error) {
	ctx := context.Background()

	trgPath, err := platform.GetAppDataPath("trg")

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

	migrations := []string{
		"ALTER TABLE Client ADD COLUMN type TEXT NOT NULL DEFAULT 'person'",
		"ALTER TABLE Client ADD COLUMN companyName TEXT NOT NULL DEFAULT ''",
		"ALTER TABLE Client ADD COLUMN representativeName TEXT NOT NULL DEFAULT ''",
		"ALTER TABLE DocTransaction ADD COLUMN title TEXT NOT NULL DEFAULT 'Комп''ютерне програмування'",
	}
	for _, migration := range migrations {
		if _, err := database.ExecContext(ctx, migration); err != nil && !isDuplicateColumnError(err) {
			log.Println("MIGRATION ERROR", err)
			return nil, nil, err
		}
	}

	queries := qr.New(database)
	return queries, database, nil
}

func isDuplicateColumnError(err error) bool {
	return err != nil && strings.Contains(err.Error(), "duplicate column name:")
}
