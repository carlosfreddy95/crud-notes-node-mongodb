"use strict";

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const port = 3000;
const url =
  "mongodb+srv://admin:oHeV3bcggrKPLSmc@cluster0.ybxpb.mongodb.net/?retryWrites=true&w=majority";

//Atchivos estáticos
app.use(express.static(path.join(__dirname, "public")));

//Configuración para evitar fallos de conexión
mongoose.Promise = global.Promise;

let noteRoutes = require("./routes/note");

//Cargamos body-parser
app.use(bodyParser.urlencoded({ extended: false }));

//Cualquier petición convertirla en formato JSON
app.use(bodyParser.json());

//Activamos el CORS para permitir peticiones AJAX Y HTTP desde el frontend
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS"),
    res.header("Allow", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

//Cargamos los archivos de ruta de la app
app.use("/api", noteRoutes);

mongoose.connect(url, { useNewUrlParser: true }).then(() => {
  console.log("Connected to DB");

  app.listen(port, () => {
    console.log("Server running on " + port);
  });
});
