import express, { Express, Request, Response, NextFunction } from "express";
import { createServer } from "http";
import session from "express-session";
import { registerRoutes } from "./routes";
import path from "path";
import fs from "fs";

// Utility function for logging
function log(message: string, source = "express") {
  const time = new Date().toLocaleTimeString();
  console.log(`%s [%s] %s`, time, source, message);
}

async function main() {
  const app: Express = express();
  const port = process.env.PORT || 5000;

  // Parse JSON bodies
  app.use(express.json());

  // Session middleware
  app.use(
    session({
      secret: process.env.SESSION_SECRET || "your-secret-key",
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: process.env.NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 24, // 1 day
      }
    })
  );

  // Register API routes
  const server = await registerRoutes(app);

  // Serve static files from the project root
  app.use(express.static(path.join(process.cwd()), {
    setHeaders: (res, filePath) => {
      if (filePath.endsWith('.js')) {
        res.setHeader('Content-Type', 'application/javascript');
      }
      if (filePath.endsWith('.ts') || filePath.endsWith('.tsx')) {
        res.setHeader('Content-Type', 'application/javascript');
      }
      if (filePath.endsWith('.css')) {
        res.setHeader('Content-Type', 'text/css');
      }
      if (filePath.endsWith('.html')) {
        res.setHeader('Content-Type', 'text/html');
      }
    }
  }));
  
  // Serve index.html from the root directory for the homepage
  app.get('/', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'index.html'));
  });
  
  // Special catch-all route for client-side routing
  app.get(/^(?!\/api).*$/, (req, res) => {
    // Serve specific files directly if they exist
    const filePath = path.join(process.cwd(), req.path);
    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      return res.sendFile(filePath);
    }
    
    // Default to index.html for all other non-API routes
    res.sendFile(path.join(process.cwd(), 'index.html'));
  });

  // Simple error handler
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ message: "Something went wrong!" });
  });

  // Start the server
  server.listen(port, () => {
    log(`serving on port ${port}`);
  });
}

main().catch((error) => {
  console.error("Failed to start server:", error);
  process.exit(1);
});