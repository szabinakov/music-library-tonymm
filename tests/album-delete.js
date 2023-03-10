// tests/album-delete.js

const { expect } = require('chai');
const request = require('supertest');
const db = require('../src/db');
const app = require('../src/app');

describe('Delete Album', () => {
  let album;
  let artist;
  let singleArtistId;
  beforeEach(async () => {
    let albumData;
    let artistData;

    artistData = await Promise.all([
      db.query(
        `INSERT INTO Artists (name, genre) VALUES ($1, $2) RETURNING *`,
        ['Tame Impala', 'Rock']
      ),
    ]);
    artist = artistData.map(({ rows }) => rows[0]);
    singleArtistId = artist[0].id;

    albumData = await Promise.all([
      db.query(
        'INSERT INTO Album (name, year, artist_id) VALUES ($1, $2, $3) RETURNING *',
        ['How Soon Is Now', 1988, singleArtistId]
      ),
      db.query(
        'INSERT INTO Album (name, year, artist_id) VALUES ($1, $2, $3) RETURNING *',
        ['The Queen Is Dead', 1989, singleArtistId]
      ),
      db.query(
        'INSERT INTO Album (name, year, artist_id) VALUES ($1, $2, $3) RETURNING *',
        ['Louder Than Bombs', 1990, singleArtistId]
      ),
    ]);

    album = albumData.map(({ rows }) => rows[0]);
  });

  describe('DELETE /albums/{id}', () => {
    it('deletes the album and returns the deleted data', async () => {
      const { status, body } = await request(app)
        .delete(`/albums/${album[0].id}`)
        .send();

      expect(status).to.equal(200);

      expect(body).to.deep.equal({
        id: album[0].id,
        name: 'How Soon Is Now',
        year: 1988,
        artist_id: singleArtistId,
      });
    });

    it('returns a 404 if the album does not exist', async () => {
      const { status } = await request(app).delete('/albums/999999999').send();

      expect(status).to.equal(404);
    });
  });
});