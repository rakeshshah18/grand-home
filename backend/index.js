import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db.js";
import config from "./config/config.js";
import routes from "./src/routes/index.js";

dotenv.config();
const app = express();

// Middleware
app.use(express.json());

connectDB();

// Routes
app.use("/api", routes);

const port = config.port || 8000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});