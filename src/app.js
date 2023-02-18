const express = require('express');
const artistRouter = require('./routes/artist');

const app = express();

app.use(express.json());

app.use('/artists', artistRouter);

// not in the solution
app.get('/', (_, res) => {
    console.log('Refresh Browser!')
    res.status(200).json({ output: 'Hello Postman!' });
  });

module.exports = app;
