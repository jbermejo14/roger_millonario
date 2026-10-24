import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3000;

// Obtener la IP local de la Wi-Fi / Red
function getLocalIp() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === "IPv4" && !iface.internal) {
        return iface.address;
      }
    }
  }
  return "localhost";
}

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".mjs": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".ico": "image/x-icon",
  ".mp3": "audio/mpeg",
  ".m4a": "audio/mp4",
  ".aac": "audio/aac",
};

const server = http.createServer((req, res) => {
  let reqUrl = req.url.split("?")[0];
  if (reqUrl === "/" || reqUrl === "") {
    reqUrl = "/index.html";
  }

  const safePath = path.normalize(path.join(__dirname, reqUrl));
  if (!safePath.startsWith(__dirname)) {
    res.writeHead(403);
    res.end("Acceso denegado");
    return;
  }

  fs.stat(safePath, (err, stats) => {
    if (err || !stats.isFile()) {
      // Si se pide un recurso con extensión (audio, imagen, etc.) que no existe, responder 404 real
      if (path.extname(reqUrl)) {
        res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
        res.end("404 No encontrado");
        return;
      }
      // Fallback a index.html solo para rutas SPA sin extensión
      const indexPath = path.join(__dirname, "index.html");
      fs.readFile(indexPath, (readErr, content) => {
        if (readErr) {
          res.writeHead(404);
          res.end("404 No encontrado");
        } else {
          res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
          res.end(content);
        }
      });
      return;
    }

    const ext = path.extname(safePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || "application/octet-stream";
    const totalSize = stats.size;
    const range = req.headers.range;

    // Soporte completo para Range requests (HTTP 206) - esencial para audio y seek en móviles/navegadores
    if (range) {
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : totalSize - 1;

      if (start >= totalSize || end >= totalSize) {
        res.writeHead(416, { "Content-Range": `bytes */${totalSize}` });
        res.end();
        return;
      }

      const chunkSize = (end - start) + 1;
      res.writeHead(206, {
        "Content-Range": `bytes ${start}-${end}/${totalSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": chunkSize,
        "Content-Type": contentType,
        "Access-Control-Allow-Origin": "*",
      });

      fs.createReadStream(safePath, { start, end }).pipe(res);
    } else {
      res.writeHead(200, {
        "Content-Length": totalSize,
        "Content-Type": contentType,
        "Accept-Ranges": "bytes",
        "Cache-Control": "no-cache",
        "Access-Control-Allow-Origin": "*",
      });

      fs.createReadStream(safePath).pipe(res);
    }
  });
});

function startServer(portToTry) {
  server.listen(portToTry, "0.0.0.0", () => {
    const localIp = getLocalIp();
    console.log("\n========================================================");
    console.log("  🏆  ¿QUIÉN QUIERE SER MILLONARIO? - SERVIDOR ACTIVO");
    console.log("========================================================");
    console.log(`\n  🖥️  En tu PC:                http://localhost:${portToTry}`);
    console.log(`  📱  En el iPhone de tu novia: http://${localIp}:${portToTry}\n`);
    console.log("  (Ambos dispositivos deben estar en la misma red Wi-Fi)");
    console.log("========================================================\n");
  });

  server.on("error", (err) => {
    if (err.code === "EADDRINUSE") {
      console.log(`⚠️  Puerto ${portToTry} ocupado. Probando en puerto ${portToTry + 1}...`);
      startServer(portToTry + 1);
    } else {
      console.error("Error del servidor:", err);
    }
  });
}

startServer(Number(PORT));
