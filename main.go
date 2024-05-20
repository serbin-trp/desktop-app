package main

import (
	"app/api"
	"app/storage"
	"log"

	"embed"

	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/assetserver"
	"github.com/wailsapp/wails/v2/pkg/options/linux"
)

//go:embed all:frontend/dist
var assets embed.FS

func main() {
	// Create an instance of the app structure
	app := NewApp()

	queries, db, err := storage.InitDB()

	api := api.NewAPI(*queries, db)

	icon := GetIcon()
	log.Println(icon)
	// Create application with options
	err = wails.Run(&options.App{
		Title:  "trg",
		Width:  1024,
		Height: 768,
		AssetServer: &assetserver.Options{
			Assets: assets,
		},

		Linux: &linux.Options{
			ProgramName:         "trg",
			Icon:                icon,
			WindowIsTranslucent: true,
		},
		BackgroundColour: &options.RGBA{R: 27, G: 38, B: 54, A: 1},
		OnStartup:        app.startup,
		Bind: []interface{}{
			app,
			api,
		},
	})

	if err != nil {
		println("Error:", err.Error())
	}
}
