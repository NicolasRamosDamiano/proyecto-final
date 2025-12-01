const express = require("express");
const path = require("path");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();
app.use(cors());
app.use(express.json()); // para leer JSON en POST

const SECRET = "clave_super_secreta"; // clave para firmar tokens

// -----------------------------
// SERVIR JSONS
// -----------------------------
app.get("/:folder/:file", (req, res) => {
  const { folder, file } = req.params;
  const filePath = path.join(__dirname, "data", folder, file);

  res.sendFile(filePath, (err) => {
    if (err) {
      console.error(err);
      res.status(404).json({ error: "Archivo no encontrado" });
    }
  });
});

// -----------------------------
// LOGIN
// -----------------------------
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  // Aquí podés poner tu lógica de validación contra DB o usuarios hardcode
  if (email === "admin@admin.com" && password === "1234") {
    // Generar token
    const token = jwt.sign({ email }, SECRET, { expiresIn: "1h" });
    return res.json({ token });
  }

  res.status(401).json({ error: "Credenciales inválidas" });
});

// -----------------------------
// MIDDLEWARE DE AUTORIZACIÓN
// -----------------------------
function auth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Token faltante" });
  }

  const token = authHeader.split(" ")[1]; // "Bearer <token>"

  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ error: "Token inválido" });
    req.user = decoded; // info del usuario disponible en req.user
    next();
  });
}

// -----------------------------
// EJEMPLO DE RUTA PROTEGIDA
// -----------------------------
app.get("/ecommerce/:folder/:file", auth, (req, res) => {
  const { folder, file } = req.params;
  const filePath = path.join(__dirname, "data", folder, file);

  res.sendFile(filePath, (err) => {
    if (err) {
      console.error(err);
      res.status(404).json({ error: "Archivo no encontrado" });
    }
  });
});

app.listen(3000, () => {
  console.log("Backend corriendo en http://localhost:3000");
});