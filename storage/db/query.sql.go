// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.26.0
// source: query.sql

package db

import (
	"context"
)

const createClient = `-- name: CreateClient :one
INSERT INTO Client (firstName, lastName, fathersName, title, ipn, address, account, phone)
VALUES (?, ?, ?, ?, ?, ?, ?, ?)
RETURNING id, firstname, lastname, fathersname, title, ipn, address, account, phone
`

type CreateClientParams struct {
	Firstname   string
	Lastname    string
	Fathersname string
	Title       string
	Ipn         string
	Address     string
	Account     string
	Phone       string
}

func (q *Queries) CreateClient(ctx context.Context, arg CreateClientParams) (Client, error) {
	row := q.db.QueryRowContext(ctx, createClient,
		arg.Firstname,
		arg.Lastname,
		arg.Fathersname,
		arg.Title,
		arg.Ipn,
		arg.Address,
		arg.Account,
		arg.Phone,
	)
	var i Client
	err := row.Scan(
		&i.ID,
		&i.Firstname,
		&i.Lastname,
		&i.Fathersname,
		&i.Title,
		&i.Ipn,
		&i.Address,
		&i.Account,
		&i.Phone,
	)
	return i, err
}

const createDocument = `-- name: CreateDocument :one
INSERT INTO Document (executorId, contractorId, date, title)
VALUES (?, ?, ?, ?)
RETURNING id, executorid, contractorid, date, title
`

type CreateDocumentParams struct {
	Executorid   int64
	Contractorid int64
	Date         string
	Title        string
}

func (q *Queries) CreateDocument(ctx context.Context, arg CreateDocumentParams) (Document, error) {
	row := q.db.QueryRowContext(ctx, createDocument,
		arg.Executorid,
		arg.Contractorid,
		arg.Date,
		arg.Title,
	)
	var i Document
	err := row.Scan(
		&i.ID,
		&i.Executorid,
		&i.Contractorid,
		&i.Date,
		&i.Title,
	)
	return i, err
}

const createTransaction = `-- name: CreateTransaction :one
INSERT INTO DocTransaction (documentId, amount)
VALUES (?, ?)
RETURNING id, documentid, amount
`

type CreateTransactionParams struct {
	Documentid int64
	Amount     string
}

func (q *Queries) CreateTransaction(ctx context.Context, arg CreateTransactionParams) (DocTransaction, error) {
	row := q.db.QueryRowContext(ctx, createTransaction, arg.Documentid, arg.Amount)
	var i DocTransaction
	err := row.Scan(&i.ID, &i.Documentid, &i.Amount)
	return i, err
}

const deleteClient = `-- name: DeleteClient :exec
DELETE FROM Client WHERE id = ?
`

func (q *Queries) DeleteClient(ctx context.Context, id int64) error {
	_, err := q.db.ExecContext(ctx, deleteClient, id)
	return err
}

const deleteDocument = `-- name: DeleteDocument :exec

DELETE FROM Document
WHERE id = ?
`

func (q *Queries) DeleteDocument(ctx context.Context, id int64) error {
	_, err := q.db.ExecContext(ctx, deleteDocument, id)
	return err
}

const deleteTransaction = `-- name: DeleteTransaction :exec
DELETE FROM DocTransaction WHERE id = ?
`

func (q *Queries) DeleteTransaction(ctx context.Context, id int64) error {
	_, err := q.db.ExecContext(ctx, deleteTransaction, id)
	return err
}

const getAllClients = `-- name: GetAllClients :many
SELECT id, firstname, lastname, fathersname, title, ipn, address, account, phone
FROM Client
`

func (q *Queries) GetAllClients(ctx context.Context) ([]Client, error) {
	rows, err := q.db.QueryContext(ctx, getAllClients)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []Client
	for rows.Next() {
		var i Client
		if err := rows.Scan(
			&i.ID,
			&i.Firstname,
			&i.Lastname,
			&i.Fathersname,
			&i.Title,
			&i.Ipn,
			&i.Address,
			&i.Account,
			&i.Phone,
		); err != nil {
			return nil, err
		}
		items = append(items, i)
	}
	if err := rows.Close(); err != nil {
		return nil, err
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}

const getClientByID = `-- name: GetClientByID :one
SELECT id, firstname, lastname, fathersname, title, ipn, address, account, phone
FROM Client
WHERE id = ?
`

func (q *Queries) GetClientByID(ctx context.Context, id int64) (Client, error) {
	row := q.db.QueryRowContext(ctx, getClientByID, id)
	var i Client
	err := row.Scan(
		&i.ID,
		&i.Firstname,
		&i.Lastname,
		&i.Fathersname,
		&i.Title,
		&i.Ipn,
		&i.Address,
		&i.Account,
		&i.Phone,
	)
	return i, err
}

const getDocumentByID = `-- name: GetDocumentByID :one
SELECT id, executorid, contractorid, date, title
FROM Document
WHERE id = ?
`

func (q *Queries) GetDocumentByID(ctx context.Context, id int64) (Document, error) {
	row := q.db.QueryRowContext(ctx, getDocumentByID, id)
	var i Document
	err := row.Scan(
		&i.ID,
		&i.Executorid,
		&i.Contractorid,
		&i.Date,
		&i.Title,
	)
	return i, err
}

const getDocuments = `-- name: GetDocuments :many
SELECT id, executorid, contractorid, date, title
FROM Document
`

func (q *Queries) GetDocuments(ctx context.Context) ([]Document, error) {
	rows, err := q.db.QueryContext(ctx, getDocuments)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []Document
	for rows.Next() {
		var i Document
		if err := rows.Scan(
			&i.ID,
			&i.Executorid,
			&i.Contractorid,
			&i.Date,
			&i.Title,
		); err != nil {
			return nil, err
		}
		items = append(items, i)
	}
	if err := rows.Close(); err != nil {
		return nil, err
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}

const getTransactionsByDoc = `-- name: GetTransactionsByDoc :many
SELECT id, documentid, amount
FROM DocTransaction
WHERE documentId = ?
`

func (q *Queries) GetTransactionsByDoc(ctx context.Context, documentid int64) ([]DocTransaction, error) {
	rows, err := q.db.QueryContext(ctx, getTransactionsByDoc, documentid)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []DocTransaction
	for rows.Next() {
		var i DocTransaction
		if err := rows.Scan(&i.ID, &i.Documentid, &i.Amount); err != nil {
			return nil, err
		}
		items = append(items, i)
	}
	if err := rows.Close(); err != nil {
		return nil, err
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}

const updateClientByID = `-- name: UpdateClientByID :exec
UPDATE Client
SET firstName = ?, lastName = ?, fathersName = ?, title = ?, ipn = ?, address = ?, account = ?, phone = ?
WHERE id = ?
RETURNING id, firstname, lastname, fathersname, title, ipn, address, account, phone
`

type UpdateClientByIDParams struct {
	Firstname   string
	Lastname    string
	Fathersname string
	Title       string
	Ipn         string
	Address     string
	Account     string
	Phone       string
	ID          int64
}

func (q *Queries) UpdateClientByID(ctx context.Context, arg UpdateClientByIDParams) error {
	_, err := q.db.ExecContext(ctx, updateClientByID,
		arg.Firstname,
		arg.Lastname,
		arg.Fathersname,
		arg.Title,
		arg.Ipn,
		arg.Address,
		arg.Account,
		arg.Phone,
		arg.ID,
	)
	return err
}