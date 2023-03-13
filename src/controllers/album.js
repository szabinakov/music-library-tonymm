// src/controllers/artist.js
const db = require('../db/index.js');

const createAlbum = async (req, res) => {
  const { name, year } = req.body;
  if (!name || !year) {
    return res.status(400).json({ message: 'Name and year are required'});
  }
  const { id } = req.params;

  try {
    console.log('Before query');
    const { rows: [album], } = await db.query(
        'INSERT INTO Album (name, year, artist_id) VALUES ($1, $2, $3) RETURNING *', 
        [name, year, id]);
    console.log('After query');
    res.status(200).json(album)
  } catch (err) {
    console.log('Error: ',err.message)
    res.status(500).json(err.message);
  }
};

const getAllAlbums = async (_, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM Album');
    res.status(200).json(rows)
  } catch (err) {
    res.status(500).json(err.message);
  }
}; 

const getAlbumById = async (req, res) => {
  const { id } = req.params;

  try {
    const { rows: [album] } = await db.query('SELECT * FROM Album WHERE id = $1', [id]);
    if (!album) {
      res.status(404).json({ message: `album ${id} does not exist` });
    }

    res.status(200).json(album)
  } catch (err) {
    res.status(500).json(err.message)
  }
}; 

const updateAlbum = async (req, res) => {
  const { id } = req.params
  const { name, year, artist_id } = req.body
  
  let query, params;
  
  if (name && year && artist_id) {
      query = 'UPDATE Album SET name = $1, year = $2, artist_id = $3 WHERE id =$4 RETURNING *'
      params = [name, year, artist_id, id];
  } else if (name && year) {
      query = 'UPDATE Album SET name = $1 WHERE id = $3 RETURNING *'
      params = [name, year, id]
  } else if (name && artist_id) {
      query = 'UPDATE Album SET name = $1,artist_id = $2 WHERE id = $3 RETURNING *'
      params = [name, artist_id, id]
  } else if (year && artist_id) {
      query = 'UPDATE Album SET year = $1, artist_id = $2 WHERE id = $3 RETURNING *'
      params = [year, artist_id, id];
  } else if (name) {
     query = 'UPDATE Album SET name = $1 WHERE id = $2 RETURNING *'
     params = [name, id];
  } else if (year) {
     query = 'UPDATE Album SET artists_id = $1 WHERE id = $2 RETURNING *'
     params = [artist_id, id];
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
    const { rows: [ album ] } = await db.query('DELETE FROM Album WHERE id = $1 RETURNING *', [id])

    if (!album) {
      return res.status(404).json({ message: `album ${id} does not exist` })
    }

    res.status(200).json(album)
  } catch (err) {
    console.log(err)
    res.status(500).json(err.message)
  }
} 

module.exports = { createAlbum, getAllAlbums, getAlbumById, updateAlbum, deleteAlbum } 