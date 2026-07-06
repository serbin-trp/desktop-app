package api

import (
	"app/storage/db"
	"testing"
)

func TestMapClientIncludesTypeAndCompanyName(t *testing.T) {
	client := mapClient(db.Client{
		ID:                 7,
		Firstname:          "Ada",
		Lastname:           "Lovelace",
		Fathersname:        "Byron",
		Title:              "Ada Lovelace Byron",
		Type:               "company",
		Companyname:        "Analytical Engines LLC",
		Representativename: "Petro Petrovych",
		Ipn:                "123",
		Address:            "Kyiv",
		Account:            "UA123",
		Phone:              "+380",
	})

	if client.Type != "company" {
		t.Fatalf("Type = %q, want company", client.Type)
	}
	if client.Companyname != "Analytical Engines LLC" {
		t.Fatalf("Companyname = %q, want Analytical Engines LLC", client.Companyname)
	}
	if client.Representativename != "Petro Petrovych" {
		t.Fatalf("Representativename = %q, want Petro Petrovych", client.Representativename)
	}
}

func TestMapCreateClientParamsIncludesTypeAndCompanyName(t *testing.T) {
	params := mapCreateClientParams(CreateClientParams{
		Type:               "company",
		Companyname:        "Analytical Engines LLC",
		Representativename: "Petro Petrovych",
		Title:              "Analytical Engines LLC",
	})

	if params.Type != "company" {
		t.Fatalf("Type = %q, want company", params.Type)
	}
	if params.Companyname != "Analytical Engines LLC" {
		t.Fatalf("Companyname = %q, want Analytical Engines LLC", params.Companyname)
	}
	if params.Representativename != "Petro Petrovych" {
		t.Fatalf("Representativename = %q, want Petro Petrovych", params.Representativename)
	}
}
