package api

import (
	"app/storage/db"
	"testing"
)

func TestMapTransactionIncludesTitle(t *testing.T) {
	transaction := mapTrx(db.DocTransaction{
		ID:         1,
		Documentid: 2,
		Title:      "Консультаційні послуги",
		Amount:     "1200",
	})

	if transaction.Title != "Консультаційні послуги" {
		t.Fatalf("Title = %q, want Консультаційні послуги", transaction.Title)
	}
}

func TestMapCreateTransactionIncludesTitle(t *testing.T) {
	params := mapCreateTrx(CreateDocTransaction{
		Documentid: 2,
		Title:      "Консультаційні послуги",
		Amount:     "1200",
	})

	if params.Title != "Консультаційні послуги" {
		t.Fatalf("Title = %q, want Консультаційні послуги", params.Title)
	}
}
