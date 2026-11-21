# 5thcloud

A small self-hosted photo cloud. It serves a folder of photos from a home server (a ThinkPad T440 running Ubuntu) so I can browse it and download files from my phone, from anywhere, over a private [Tailscale](https://tailscale.com) network.

## Features

- Browse folders and subfolders of a photos directory
- Download any file
- Read-only

## Stack

| Part | Tech |
| --- | --- |
| Backend | Node.js, Express |
| Frontend | React, Vite, React Router |
| Access | Tailscale (`tailscale serve`) |
| Host | ThinkPad T440, Ubuntu |

## How it works

```
phone browser -> Tailscale (private network) -> Express on 127.0.0.1:3000 -> photos folder
```

## Project structure

```
5thcloud/
  server/      # Express API + serves the built frontend
  frontend/    # React app (Vite)
    src/
      components/   # Folder, PhotoContainer, Breadcrumbs
      pages/        # MainPage
      routes/       # AppRouter
  README.md
```

## Configuration

Environment variables for the server:

| Variable | Default | Description |
| --- | --- | --- |
| `PHOTOS_DIR` | `../photos` | Folder to serve (path is relative to where `node` is started) |
| `PORT` | `3000` | Port the server listens on (always bound to `127.0.0.1`) |

## Run locally (development)
```bash
# backend
cd server
npm install
node index.js

# frontend (second terminal)
cd frontend
npm install
npm run dev

## Deploy on the server
```bash
git clone https://github.com/bekticeva/5thcloud.git
cd 5thcloud

cd server && npm install 
cd frontend && npm install && npm run build 

mkdir -p ~/photos
cd server
PHOTOS_DIR="$HOME/photos" node index.js
```

Then expose it to the tailnet only:

```bash
sudo tailscale serve --bg 3000
tailscale serve status    # prints the https://<machine>.<tailnet>.ts.net URL
```


