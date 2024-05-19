package api

import "app/storage/db"

type DocTransaction struct {
	ID         int64  `json:"id"`
	Documentid int64  `json:"documentId"`
	Amount     string `json:"amount"`
}

type CreateDocTransaction struct {
	Documentid int64  `json:"documentId"`
	Amount     string `json:"amount"`
}

func (a *API) CreateTransaction(t CreateDocTransaction) (DocTransaction, error) {
	ct, err := a.Q.CreateTransaction(a.ctx, *mapCreateTrx(t))
	trx := mapTrx(ct)
	return *trx, err
}

func (a *API) GetTransactionsByDoc(dId int64) ([]DocTransaction, error) {
	trx, err := a.Q.GetTransactionsByDoc(a.ctx, dId)
	trxs := make([]DocTransaction, len(trx))

	for i, t := range trx {
		trxs[i] = *mapTrx(t)
	}

	return trxs, err
}

func (a *API) DeleteTransaction(id int64) error {
	return a.Q.DeleteTransaction(a.ctx, id)
}

func mapTrx(t db.DocTransaction) *DocTransaction {
	return &DocTransaction{
		ID:         t.ID,
		Amount:     t.Amount,
		Documentid: t.Documentid,
	}
}

func mapCreateTrx(t CreateDocTransaction) *db.CreateTransactionParams {
	return &db.CreateTransactionParams{
		Amount:     t.Amount,
		Documentid: t.Documentid,
	}
}
