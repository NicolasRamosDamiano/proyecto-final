const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// ================================
// 3 - ENDPOINT POST /login
// ================================
app.post("/login", (req, res) => {
    const { usuario, password } = req.body;

    if (usuario === "admin" && password === "1234") {
        const token = jwt.sign(
            { usuario },
            "SECRETO123",
            { expiresIn: "1h" }
        );

        return res.json({ token });
    }

    res.status(401).json({ error: "Usuario o contraseña inválidos" });
});

// ================================
// Iniciar servidor
// ================================
app.listen(3000, () => {
    console.log("Backend funcionando en http://localhost:3000");
});
