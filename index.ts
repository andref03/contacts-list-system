import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import contactRoutes from "./src/routes/contactRoutes.js";

dotenv.config();

const app = express();

app.use(cors({
  origin: "http://localhost:5173", // frontend
  methods: ["GET", "POST", "PUT", "DELETE"],
}));

app.use(express.json());

app.use("/contacts", contactRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));
