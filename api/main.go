package api

import (
	"app/storage/db"
	"context"
	"database/sql"
)

type API struct {
	ctx context.Context
	Q   db.Queries
	db  *sql.DB
}

func NewAPI(queries db.Queries, db *sql.DB) *API {
	ctx := context.Background()

	return &API{
		ctx: ctx,
		Q:   queries,
		db:  db,
	}
}
