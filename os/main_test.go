package os

import (
	stdos "os"
	"path/filepath"
	"runtime"
	"testing"
)

func TestGetAppDataPathUsesApplicationSupportOnDarwin(t *testing.T) {
	if runtime.GOOS != "darwin" {
		t.Skip("darwin-specific path test")
	}

	home := t.TempDir()
	t.Setenv("HOME", home)

	got, err := GetAppDataPath("trg")
	if err != nil {
		t.Fatalf("GetAppDataPath returned error: %v", err)
	}

	want := filepath.Join(home, "Library", "Application Support", "trg")
	if got != want {
		t.Fatalf("GetAppDataPath() = %q, want %q", got, want)
	}

	if info, err := stdos.Stat(want); err != nil {
		t.Fatalf("expected app data directory to exist: %v", err)
	} else if !info.IsDir() {
		t.Fatalf("expected app data path to be a directory")
	}
}
