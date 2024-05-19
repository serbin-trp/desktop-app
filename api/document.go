package api

import (
	"app/storage/db"
)

type Document struct {
	ID           int64            `json:"id"`
	Executor     Client           `json:"executor"`
	Contractor   Client           `json:"contractor"`
	Date         string           `json:"date"`
	Title        string           `json:"title"`
	Transactions []DocTransaction `json:"transactions"`
}

type CreateDocumentParams struct {
	Executorid   int64  `json:"executorId"`
	Contractorid int64  `json:"contractorId"`
	Date         string `json:"date"`
	Title        string `json:"title"`
}

func (a *API) CreateDocument(p CreateDocumentParams) (int64, error) {
	doc, err := a.Q.CreateDocument(a.ctx, *mapCreateDoc(p))
	return doc.ID, err
}

func (a *API) GetDocuments() ([]Document, error) {
	ds, err := a.Q.GetDocuments(a.ctx)

	docs := make([]Document, len(ds))
	for i, original := range ds {
		doc, err := a.mapDocument(original)
		if err != nil {
			return nil, err
		}
		docs[i] = *doc
	}
	return docs, err
}

func (a *API) GetDocumentByID(id int64) (*Document, error) {
	d, err := a.Q.GetDocumentByID(a.ctx, id)
	if err != nil {
		return nil, err
	}
	doc, err := a.mapDocument(d)
	return doc, err
}

func (a *API) mapDocument(d db.Document) (*Document, error) {
	ctr, err := a.GetClient(d.Contractorid)
	if err != nil {
		return nil, err
	}
	ex, err := a.GetClient(d.Executorid)

	if err != nil {
		return nil, err
	}
	trx, err := a.GetTransactionsByDoc(d.ID)

	if err != nil {
		return nil, err
	}

	return &Document{
		ID:           d.ID,
		Title:        d.Title,
		Executor:     ex,
		Contractor:   ctr,
		Date:         d.Date,
		Transactions: trx,
	}, nil
}

func mapCreateDoc(d CreateDocumentParams) *db.CreateDocumentParams {
	return &db.CreateDocumentParams{
		Title:        d.Title,
		Executorid:   d.Executorid,
		Contractorid: d.Contractorid,
		Date:         d.Date,
	}
}
