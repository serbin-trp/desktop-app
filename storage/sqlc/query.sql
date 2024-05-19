-- name: CreateDocument :one
INSERT INTO Document (executorId, contractorId, date, title)
VALUES (?, ?, ?, ?)
RETURNING *;

-- name: GetDocuments :many
SELECT *
FROM Document;

-- name: GetDocumentByID :one
SELECT *
FROM Document
WHERE id = ?;

-- name: DeleteDocument :exec

DELETE FROM Document
WHERE id = ?;

-- name: CreateClient :one
INSERT INTO Client (firstName, lastName, fathersName, title, ipn, address, account, phone)
VALUES (?, ?, ?, ?, ?, ?, ?, ?)
RETURNING *;


-- name: GetAllClients :many
SELECT *
FROM Client;

-- name: GetClientByID :one
SELECT *
FROM Client
WHERE id = ?;

-- name: UpdateClientByID :exec
UPDATE Client
SET firstName = ?, lastName = ?, fathersName = ?, title = ?, ipn = ?, address = ?, account = ?, phone = ?
WHERE id = ?
RETURNING *;

-- name: DeleteClient :exec
DELETE FROM Client WHERE id = ?;

-- name: CreateTransaction :one
INSERT INTO DocTransaction (documentId, amount)
VALUES (?, ?)
RETURNING *;

-- name: DeleteTransaction :exec
DELETE FROM DocTransaction WHERE id = ?;

-- name: GetTransactionsByDoc :many
SELECT *
FROM DocTransaction
WHERE documentId = ?;
