package pdf

import (
	"bytes"
	"fmt"
	"os"
	"os/exec"
	"strings"
)

func GeneratePDF(opts GenerateOpts) {

	if err := checkWkhtmltopdf(); err != nil {
		promptInstallWkhtmltopdf()
		return
	}
	// HTML content as a string
	htmlContent := opts.Content
	// Write HTML content to a temporary file
	htmlFilePath := "temp.html"
	err := os.WriteFile(htmlFilePath, []byte(htmlContent), 0644)
	if err != nil {
		fmt.Println("Error writing HTML file:", err)
		return
	}
	defer os.Remove(htmlFilePath) // Clean up after

	// Output path for the PDF file
	pdfPath := opts.Path

	// Run the pandoc command
	cmd := exec.Command("wkhtmltopdf", htmlFilePath, pdfPath)
	cmd.Stdin = strings.NewReader(htmlContent)

	// Execute the command
	var stderr bytes.Buffer
	cmd.Stderr = &stderr

	// Execute the command
	err = cmd.Run()
	if err != nil {
		fmt.Println("Error:", err)
		fmt.Println("Command stderr:", stderr.String())
		return
	}

	fmt.Println("PDF file generated successfully at", pdfPath)
}

func getCurrentDirectory() string {
	dir, err := os.Getwd()
	if err != nil {
		panic(err)
	}
	return dir
}
func promptInstallWkhtmltopdf() {
	fmt.Println("wkhtmltopdf is not installed. Please install it from https://wkhtmltopdf.org/downloads.html")
	// Optionally, open the browser to the download page
	exec.Command("open", "https://wkhtmltopdf.org/downloads.html").Start()
}
func checkWkhtmltopdf() error {
	_, err := exec.LookPath("wkhtmltopdf")
	if err != nil {
		return fmt.Errorf("wkhtmltopdf is not installed")
	}
	return nil
}
