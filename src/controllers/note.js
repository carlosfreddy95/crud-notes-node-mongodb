"use strict";

const note = require("../models/note");
let Note = require("../models/note");

//Objeto controller para disponer de todas las funciones de ruta de la app

let controller = {
  save: (req, res) => {
    //Obtener datos
    let params = req.body;
    //Objeto a guardar
    let note = new Note();
    //Asignar los valores
    note.title = params.title;
    note.description = params.description;
    //Guardar artículo en la BD
    note.save((err, noteStored) => {
      if (err || !noteStored) {
        return res.status(404).send({
          status: "Error",
          message: "La nota no se ha guardado",
        });
      }

      return res.status(200).send({
        status: "Success",
        noteStored,
      });
    });
  },

  getNotes: (req, res) => {
    let query = Note.find({});

    query.sort("-date").exec((err, notes) => {
      if (err) {
        return res.status(500).send({
          status: "Error",
          message: "Error al extrar los datos",
        });
      }

      //Si no existen notas
      if (!notes) {
        return res.status(404).send({
          status: "Error",
          message: "No hay notas para mostrar",
        });
      }

      return res.status(200).send({
        status: "Success",
        notes,
      });
    });
  },

  delete: (req, res) => {
    let noteId = req.params.id;

    Note.findOneAndDelete({ _id: noteId }, (err, noteRemoved) => {
      if (err) {
        return res.status(500).send({
          status: "Error",
          message: "Error al eliminar",
        });
      }

      if (!noteRemoved) {
        return res.status(404).send({
          status: "Error",
          message: "No se ha encontrado la nota a eliminar",
        });
      }

      return res.status(200).send({
        status: "Success",
        noteRemoved,
      });
    });
  },

  update: (req, res) => {
    let noteId = req.params.id;

    let params = req.body;

    const title = params.title;
    const description = params.description;

    Note.findOneAndUpdate(
      { _id: noteId },
      { title: title, description: description },
      { new: true },
      (err, noteUpdated) => {
        if (err) {
          return res.status(500).send({
            status: "Error",
            message: "Error al actualizar",
          });
        }

        if (!noteUpdated) {
          return res.status(404).send({
            status: "Error",
            message: "La nota no existe",
          });
        }

        return res.status(200).send({
          status: "Success",
          noteUpdated,
        });
      }
    );
  },
};

module.exports = controller;
