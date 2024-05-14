# README

## About

This is Tax Report generation Desktop App

## List of tools

- [Starter Template](https://github.com/ilsrbn/ng-mob-desktop-template)
- For desktop- [Golang](https://go.dev/)/[Wails](https://wails.io/)
- For mobile- [Capacitor](https://capacitorjs.com/)
- For Frontend- [Angular](https://angular.dev/)
- For UI- [SpartanNG](https://www.spartan.ng/)

## Requirements

- Node v20.12.2
- Go v1.22.2

## Tested on

- Manjaro Linux x86_64, Kernel: 6.6.26-1-MANJARO
- Windows 11
- Android 13 / OneUI: 5.1

## Usage

Mostly you will use Wails or Capacitor CLI, so refer to their docs to understand how to build, run, add iOS support, etc.

Few examples are here:

**Install**

```bash
cd frontend

# Install all dependencies from package-lock.json
npm ci
npm run build
```

**Start desktop app**

```bash
# Using Wails CLI
wails dev
```

**Start Mobile app**

```bash
cd frontend

# Using Capacitor CLI
# Will open Android studio
npx cap open android
```
