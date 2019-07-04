import express from "express";
import dotenv from "dotenv";

dotenv.config();

// Create express app
const app = express();

// Default route
app.get("/api/v1", (req, res) => {
  res.status(200).json({
    status: "Success",
    message: "Welcome to the PropertyPro-Lite API"
  });
});

// Response to route that don't exist
app.use((req, res, next) => {
  res
    .status(404)
    .json({ status: "404 Not Found", message: "this endpoint does not exist" });
});

// Set server port
const port = process.env.PORT;

// Listen for Requests
app.listen(port, () => {
  console.log(`This app has started on port: ${port}`);
});

export default app;
