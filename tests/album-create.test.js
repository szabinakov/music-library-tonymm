// tests/album-create.js

const {expect } = require('chai');
const request = require('supertest');
const db = require('../src/db');
const app = require('../src/app');

describe('create album', () => {
    let artist; 
    beforeEach(async () => { 
    const response = await db.query('INSERT into Artists (name, genre) VALUES ($1,$2) RETURNING *', [ 'Tame Impala', 'Rock' ]);  
    artist = response.rows[0]
});
    
  describe('/albums', () => {
    describe('POST', () => {
      it('creates a new album in the database', async () => {
        const { status, body } = await request(app).post(`/artists/${artist.id}/albums`).send({
            name: 'Tame Impala',
            year: 2012,
        });

        expect(status).to.equal(200);
        expect(body.name).to.equal('Tame Impala');
        expect(body.year).to.equal('');

        const {
            rows: [albumData],
        } = await db.query(`SELECT * FROM Albums WHERE id = ${body.id}`);
        expect(albumData.name).to.equal('Tame Impala');
        expect(albumData.year).to.equal(2012);
      });
    });
  });
});




  
  

