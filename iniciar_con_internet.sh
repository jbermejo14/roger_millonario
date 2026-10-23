#!/bin/bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
cd "$DIR"

echo "========================================================"
echo "  🏆 INICIANDO QUIEN QUIERE SER MILLONARIO (PÚBLICO)   "
echo "========================================================"

# Iniciar servidor Node en segundo plano
node server.mjs &
SERVER_PID=$!

trap "kill $SERVER_PID 2>/dev/null; exit" INT TERM EXIT

sleep 1

# Iniciar Cloudflare Tunnel
cloudflared tunnel --url http://localhost:3000
