"use strict";

const express = require("express");

let Note = require("../controllers/note");

let router = express.Router();

//Guardar nota
router.post("/save", Note.save);

//Obtener notas
router.get("/notes", Note.getNotes);

//ELiminar nota
router.delete("/delete/:id", Note.delete);

//Actualizar nota
router.put("/update/:id", Note.update);

module.exports = router;
