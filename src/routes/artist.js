// src/routes/artist.js
const express = require('express');
const artistController = require('../controllers/artist');

const router = express.Router();

router.post('/', artistController.createArtist);
router.get('/', artistController.getAllArtists); 
router.get('/:id', artistController.getArtistById);
router.put('/:id', artistController.putArtist); 
router.patch('/:id', artistController.updateArtist); 
router.delete('/:id', artistController.deleteArtist);  

module.exports = router;