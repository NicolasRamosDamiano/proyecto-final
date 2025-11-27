const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/:folder/:file", (req, res) => {
  const { folder, file } = req.params;

  const filePath = path.join(__dirname, "data", folder, file);

  res.sendFile(filePath, (err) => {
    if (err) {
      console.log(err);
      res.status(404).json({ error: "Archivo no encontrado" });
    }
  });
});

app.listen(3000, () => {
  console.log("Backend corriendo en http://localhost:3000");
});
