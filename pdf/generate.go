package pdf

import (
	"context"
	"fmt"
	"os"

	"github.com/chromedp/cdproto/page"
	"github.com/chromedp/chromedp"
)

func GeneratePDF(opts GenerateOpts) error {
	// Create context
	ctx, cancel := chromedp.NewContext(context.Background())
	defer cancel()

	// Create a temporary HTML file
	tempHTMLFile, err := os.CreateTemp("", "*.html")
	if err != nil {
		return fmt.Errorf("failed to create temp HTML file: %v", err)
	}
	defer os.Remove(tempHTMLFile.Name())

	if _, err = tempHTMLFile.Write([]byte(opts.Content)); err != nil {
		return fmt.Errorf("failed to write to temp HTML file: %v", err)
	}
	if err = tempHTMLFile.Close(); err != nil {
		return fmt.Errorf("failed to close temp HTML file: %v", err)
	}

	// Generate PDF
	var buf []byte
	if err := chromedp.Run(ctx, printToPDF(tempHTMLFile.Name(), &buf)); err != nil {
		return fmt.Errorf("failed to generate PDF: %v", err)
	}

	// Save PDF to file
	if err := os.WriteFile(opts.Path, buf, 0644); err != nil {
		return fmt.Errorf("failed to save PDF: %v", err)
	}

	return nil
}

func printToPDF(url string, res *[]byte) chromedp.Tasks {
	return chromedp.Tasks{
		chromedp.Navigate("file://" + url),
		chromedp.ActionFunc(func(ctx context.Context) error {
			buf, _, err := page.PrintToPDF().Do(ctx)
			if err != nil {
				return err
			}
			*res = buf
			return nil
		}),
	}
}
