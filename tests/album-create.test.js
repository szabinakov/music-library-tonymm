// tests/album-create.js

const {expect } = require('chai');
const request = require('supertest');
const db = require('../src/db');
const app = require('../src/app');

describe('create album', () => {
    let artist; 
    beforeEach(async () => { 
    const { rows } = await db.query('INSERT into Artists (name, genre) VALUES ($1, $2) RETURNING *', 
    ['The Smiths', 'Indie']);  
    
    artist = rows[0];
  });
 
  describe('/albums', () => {
    describe('POST', () => {
      it('creates a new album in the database', async () => {
        const { status, body } = await request(app).post(`/artists/${artist.id}/albums`).send({
            name: 'The Stone Roses',
            year: 1989,
        });

        expect(status).to.equal(200);
        expect(body.name).to.equal('The Stone Roses');
        expect(body.year).to.equal(1989);

        const {
            rows: [albumData],
        } = await db.query(`SELECT * FROM Album WHERE id = ${body.id}`);
        expect(albumData.name).to.equal('The Stone Roses');
        expect(albumData.year).to.equal(1989);
      });
    });
  });
});




  
  

