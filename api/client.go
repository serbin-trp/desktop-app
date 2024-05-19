package api

import "app/storage/db"

type Client struct {
	ID          int64  `json:"id"`
	Firstname   string `json:"firstName"`
	Lastname    string `json:"lastName"`
	Fathersname string `json:"fathersName"`
	Title       string `json:"title"`
	Ipn         string `json:"ipn"`
	Address     string `json:"address"`
	Account     string `json:"account"`
	Phone       string `json:"phone"`
}

type CreateClientParams struct {
	Firstname   string `json:"firstName"`
	Lastname    string `json:"lastName"`
	Fathersname string `json:"fathersName"`
	Title       string `json:"title"`
	Ipn         string `json:"ipn"`
	Address     string `json:"address"`
	Account     string `json:"account"`
	Phone       string `json:"phone"`
}

type UpdateClientByIDParams struct {
	ID          int64  `json:"id"`
	Firstname   string `json:"firstName"`
	Lastname    string `json:"lastName"`
	Fathersname string `json:"fathersName"`
	Title       string `json:"title"`
	Ipn         string `json:"ipn"`
	Address     string `json:"address"`
	Account     string `json:"account"`
	Phone       string `json:"phone"`
}

func mapClient(c db.Client) *Client {
	return &Client{
		ID:          c.ID,
		Ipn:         c.Ipn,
		Title:       c.Title,
		Phone:       c.Phone,
		Address:     c.Address,
		Account:     c.Account,
		Lastname:    c.Lastname,
		Firstname:   c.Firstname,
		Fathersname: c.Fathersname,
	}
}

func mapCreateClientParams(c CreateClientParams) *db.CreateClientParams {
	return &db.CreateClientParams{
		Ipn:         c.Ipn,
		Title:       c.Title,
		Phone:       c.Phone,
		Address:     c.Address,
		Account:     c.Account,
		Lastname:    c.Lastname,
		Firstname:   c.Firstname,
		Fathersname: c.Fathersname,
	}
}

func mapUpdateClientByID(c UpdateClientByIDParams) *db.UpdateClientByIDParams {
	return &db.UpdateClientByIDParams{
		ID:          c.ID,
		Ipn:         c.Ipn,
		Title:       c.Title,
		Phone:       c.Phone,
		Address:     c.Address,
		Account:     c.Account,
		Lastname:    c.Lastname,
		Firstname:   c.Firstname,
		Fathersname: c.Fathersname,
	}
}

func (a *API) NewClient(params CreateClientParams) (Client, error) {
	p := mapCreateClientParams(params)
	c, err := a.Q.CreateClient(a.ctx, *p)
	nc := mapClient(c)
	return *nc, err
}

func (a *API) UpdateClient(params UpdateClientByIDParams) error {
	p := mapUpdateClientByID(params)
	return a.Q.UpdateClientByID(a.ctx, *p)
}

func (a *API) GetClient(id int64) (Client, error) {
	c, err := a.Q.GetClientByID(a.ctx, id)
	nc := mapClient(c)
	return *nc, err
}

func (a *API) DeleteClient(id int64) error {
	return a.Q.DeleteClient(a.ctx, id)
}

func (a *API) GetAllClients() ([]Client, error) {
	cs, err := a.Q.GetAllClients(a.ctx)
	clients := make([]Client, len(cs))
	for i, original := range cs {
		clients[i] = *mapClient(original)
	}
	return clients, err
}

func (a *API) DeleteDocument(id int64) error {
	trxs, err := a.GetTransactionsByDoc(id)
	if err != nil {
		return err
	}
	dbTransaction, err := a.db.Begin()
	queriesWithTx := a.Q.WithTx(dbTransaction)
	for _, trx := range trxs {
		err := queriesWithTx.DeleteTransaction(a.ctx, trx.ID)
		if err != nil {
			dbTransaction.Rollback()
			return err
		}
	}

	err = queriesWithTx.DeleteDocument(a.ctx, id)
	if err != nil {
		dbTransaction.Rollback()
		return err
	}

	return dbTransaction.Commit()
}
