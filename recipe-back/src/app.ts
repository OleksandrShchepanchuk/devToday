import express from "express";
import recipesRouter from "./routes/recipes.routes";
import cors from "cors";

function createServer() {
  const app = express();
  app.use(
    cors({
      origin: "http://localhost:3001", // or your production domain
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      credentials: true, // if you need cookies
    })
  );

  app.use(express.json());

  app.use("/recipes", recipesRouter);

  app.get("/health", (req, res) => {
    res.json({ status: "OK" });
  });

  return app;
}

export default createServer;
