// tests/album-updateAlbum.test.js 

const { expect } = require('chai');
const request = require('supertest');
const db = require('../src/db');
const app = require('../src/app');

describe('Update Album', () => {
  let artist;
  let album;
  let uniqueArtistId;
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
    uniqueArtistId = artist[0].id;

    albumData = await Promise.all([
      db.query(
        'INSERT INTO Album (name, year, artist_id) VALUES ($1, $2, $3) RETURNING *',
        ['How Soon Is Now', 1988, uniqueArtistId]
      ),
      db.query(
        'INSERT INTO Album (name, year, artist_id) VALUES ($1, $2, $3) RETURNING *',
        ['The Queen Is Dead', 1989, uniqueArtistId]
      ),
      db.query(
        'INSERT INTO Album (name, year, artist_id) VALUES ($1, $2, $3) RETURNING *',
        ['Louder Than Bombs', 1990, uniqueArtistId]
      ),
    ]);

    album = albumData.map(({ rows }) => rows[0]);
  });

  describe('PATCH /albums/{id}', () => {
    it('updates the album and returns the updated record', async () => {
      const { status, body } = await request(app).patch(`/albums/${album[0].id}`).send({ name: 'new album', year: 2000, artist_id: uniqueArtistId });
      expect(status).to.equal(200);

      expect(body).to.deep.equal({
        id: album[0].id,
        name: 'new album',
        year: 2000,
        artist_id: uniqueArtistId,
      }); 
    });

    it('returns a 404 if the album does not exist', async () => {
        const { status } = await request(app).patch('/albums/999999999').send({ name: 'new album', year: 2000, artist_id: uniqueArtistId });
        expect(status).to.equal(404);
    });
  });
});