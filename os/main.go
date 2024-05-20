package os

import (
	"fmt"
	"os"
	"path/filepath"
	"runtime"
)

// GetAppDataPath returns the appropriate path for storing application data
func GetAppDataPath(appName string) (string, error) {
	var path string

	switch runtime.GOOS {
	case "windows":
		// On Windows, use the %APPDATA% environment variable
		appData := os.Getenv("APPDATA")
		if appData == "" {
			return "", fmt.Errorf("APPDATA environment variable is not set")
		}
		path = filepath.Join(appData, appName)

	case "linux":
		// On Linux, use ~/.local/share
		homeDir, err := os.UserHomeDir()
		if err != nil {
			return "", fmt.Errorf("unable to get user home directory: %v", err)
		}
		path = filepath.Join(homeDir, ".local", "share", appName)

	default:
		return "", fmt.Errorf("unsupported platform: %s", runtime.GOOS)
	}

	// Ensure the directory exists
	err := os.MkdirAll(path, 0755)
	if err != nil {
		return "", fmt.Errorf("unable to create directory: %v", err)
	}

	return path, nil
}
