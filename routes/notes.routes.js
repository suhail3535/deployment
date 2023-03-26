const { Router } = require("express");
const { NoteModel } = require("../model/note.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const noteRouter = Router();

noteRouter.get("/", async (req, res) => {
  const token = req.headers.authorization;
  const decoded = jwt.verify(token, "bruce");

  try {
    if (decoded) {
      const note = await NoteModel.find({ userID: decoded.userID });
      res.status(200).send(note);
    }
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

noteRouter.post("/add", async (req, res) => {
  const payload = req.body;
  try {
    const note = new NoteModel(payload);
    await note.save();
    res.status(200).send({ message: "Note has been Added" });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

noteRouter.patch("/:noteId", async (req, res) => {
  const { noteId } = req.params;
  let payload = req.body;
  try {
    await NoteModel.findByIdAndUpdate({ _id: noteId }, payload);
    res.status(200).send({ message: "Note Updated" });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

noteRouter.delete("/:noteId", async (req, res) => {
  const { noteId } = req.params;

  try {
    await NoteModel.findByIdAndDelete({ _id: noteId });
    res.status(200).send({ message: "Note Deleted " });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

module.exports = { noteRouter };
