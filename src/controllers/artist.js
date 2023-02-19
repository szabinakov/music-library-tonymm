// src/controllers/artist.js
const db = require('../db/index.js');

const createArtist = async (req, res) => {
  const { name, genre } = req.body

  try {
    const { rows: [ artist ] } = await db.query(`INSERT INTO Artists (name, genre) VALUES ('${name}', '${genre}') RETURNING *`)
    res.status(201).json(artist)
  } catch (err) {
    res.status(500).json(err.message)
  }
};

module.exports = { createArtist } 
