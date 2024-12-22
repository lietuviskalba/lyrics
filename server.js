import express from "express";
import cors from "cors"; // Import the CORS middleware
import songRoutes from "./routes/songRoutes.js";

const app = express();

// Enable CORS
app.use(cors({ origin: "http://localhost:5173" }));

// Middleware to parse JSON request bodies
app.use(express.json());

app.use("/api", songRoutes);
console.log(app._router.stack);

const PORT = 5000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
