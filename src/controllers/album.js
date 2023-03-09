// src/controllers/artist.js
const db = require('../db/index.js');

const createAlbum = async (req, res) => {
  const { name, year } = req.body
  const { id } = req.params;

  try {
    const { rows: [ album ] } = await db.query(
        'INSERT INTO Albums (name, year, artist_id) VALUES ($1, $2, $3) RETURNING *', 
        [name, year, id]);
    res.status(200).json(album)
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const getAllAlbums = async (_, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM Albums')
    res.status(200).json(rows)
  } catch (err) {
    res.status(500).json(err.message)
  }
}; 

const getAlbumById = async (req, res) => {
  try {
    const { id } = req.params
    const { rows: [ album ] } = await db.query('SELECT * FROM Albums WHERE id = $1', [id])

    if (!album) {
      res.status(404).json({ message: `album ${id} does not exist` })
    }
    res.status(200).json(album)
  } catch (err) {
    res.status(500).json(err.message)
  }
}; 

const putAlbum = async (req, res) => {
  const { id } = req.params
  const { name, genre } = req.body

  try {
    const { rows: [ album ] } = await db.query('UPDATE Albums SET name = $1, genre = $2 WHERE id = $3 RETURNING *', [ name, genre, id ])

    if (!album) {
      return res.status(404).json({ message: `album ${id} does not exist` })
    }
    res.status(200).json(album)
  } catch (err) {
    console.log(err)
    res.status(500).json(err.message)
  }
}

const updateAlbum = async (req, res) => {
  const { id } = req.params
  const { name, genre } = req.body
  
  let query, params
  
  if (name && genre) {
      query = `UPDATE Albums SET name = $1, genre = $2 WHERE id = $3 RETURNING *`
      params = [name, genre, id]
  } else if (name) {
      query = `UPDATE Albums SET name = $1 WHERE id = $2 RETURNING *`
      params = [name, id]
  } else if (genre) {
      query = `UPDATE Albums SET genre = $1 WHERE id = $2 RETURNING *`
      params = [genre, id]
  }

  try {

    const { rows: [ album ] } = await db.query(query, params)

    if (!album) {
      return res.status(404).json({ message: `album ${id} does not exist` })
    }

    res.status(200).json(album)
  } catch (err) {
    console.log(err)
    res.status(500).json(err.message)
  }
}

const deleteAlbum = async (req, res) => {
  const { id } = req.params

  try {
    const { rows: [ album ] } = await db.query('DELETE FROM Albums WHERE id = $1 RETURNING *', [id])

    if (!album) {
      return res.status(404).json({ message: `album ${id} does not exist` })
    }

    res.status(200).json(album)
  } catch (err) {
    console.log(err)
    res.status(500).json(err.message)
  }
} 

module.exports = { createAlbum, getAllAlbums, getAlbumById, putAlbum, updateAlbum, deleteAlbum } 