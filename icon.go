package main

import (
	"fmt"
	"io"
	"os"
	"os/user"
	"path/filepath"
)

func GetIcon() []byte {

	iPath, err := getIconPath()

	isFile := fileExists(iPath)
	if !isFile {
		writeIcon()
	}

	if err != nil {
		panic(err) // Handle error appropriately in production
	}
	linuxIconFile, err := os.Open(iPath)
	if err != nil {
		panic(err) // Handle error appropriately in production
	}
	defer linuxIconFile.Close()

	// Read all bytes from the file
	icon, err := io.ReadAll(linuxIconFile)
	if err != nil {
		panic(err) // Handle error appropriately in production
	}

	return icon

}

func getIconPath() (string, error) {
	currentUser, err := user.Current()
	if err != nil {
		return "", err
	}

	// Get the home directory of the current user
	homeDir := currentUser.HomeDir

	// Create the path for the .trg directory
	iPath := filepath.Join(homeDir, ".trg", "logo.png")
	return iPath, nil
}

func writeIcon() {
	imageData := []byte{ /* your image data */ }

	// Get the user's home directory
	homeDir, err := os.UserHomeDir()
	if err != nil {
		fmt.Println("Error getting home directory:", err)
		return
	}

	// Construct the path to the desired file
	appName := ".trg"
	dirPath := filepath.Join(homeDir, appName)
	filePath := filepath.Join(dirPath, "logo.png")

	// Create the directory if it doesn't exist
	err = os.MkdirAll(dirPath, os.ModePerm)
	if err != nil {
		fmt.Println("Error creating directories:", err)
		return
	}

	// Write the []byte data to the file
	err = os.WriteFile(filePath, imageData, 0644)
	if err != nil {
		fmt.Println("Error writing file:", err)
		return
	}
}

func fileExists(filePath string) bool {
	info, err := os.Stat(filePath)
	if os.IsNotExist(err) {
		return false
	}
	return !info.IsDir()
}
