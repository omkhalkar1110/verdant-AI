import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware
  app.use(express.json());

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", message: "Verdant API is running" });
  });

  // Mock API for Energy Predictions
  app.get("/api/energy-data", (req, res) => {
    const data = [
      { month: "Jan", actual: 400, predicted: 420 },
      { month: "Feb", actual: 300, predicted: 310 },
      { month: "Mar", actual: 200, predicted: 230 },
      { month: "Apr", actual: 278, predicted: 250 },
      { month: "May", actual: 189, predicted: 210 },
      { month: "Jun", actual: 239, predicted: 240 },
    ];
    res.json(data);
  });

  // Vite integration for development
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // In production, the server is inside dist/
    // Serve static files from the same directory
    const distPath = __dirname;
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Verdant server running on http://localhost:${PORT}`);
  });
}

startServer();
