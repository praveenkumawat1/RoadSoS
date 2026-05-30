import http from "http";
import fs from "fs";
import path from "path";

const port = process.env.PORT || 8080;
const root = path.resolve(process.cwd(), "../roadsos-app/dist");

const mime = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".json": "application/json",
  ".woff2": "font/woff2",
  ".ico": "image/x-icon",
};

function serveFile(filePath, res) {
  const ext = path.extname(filePath);
  const type = mime[ext] || "application/octet-stream";
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end("Not found");
      return;
    }
    res.writeHead(200, { "Content-Type": type });
    res.end(data);
  });
}

const server = http.createServer((req, res) => {
  try {
    const urlPath = decodeURIComponent(
      new URL(req.url, `http://localhost`).pathname,
    );
    let filePath = path.join(root, urlPath);
    if (filePath.endsWith("/")) filePath = path.join(filePath, "index.html");

    if (!filePath.startsWith(root)) {
      res.writeHead(403);
      res.end("Forbidden");
      return;
    }

    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      serveFile(filePath, res);
    } else {
      // SPA fallback to index.html
      const indexPath = path.join(root, "index.html");
      if (fs.existsSync(indexPath)) {
        serveFile(indexPath, res);
      } else {
        res.writeHead(500);
        res.end("Build not found. Please run npm run build in roadsos-app");
      }
    }
  } catch (e) {
    res.writeHead(500);
    res.end("Server error");
  }
});

server.listen(port, () => {
  console.log(`Static server serving ${root} at http://localhost:${port}`);
});
