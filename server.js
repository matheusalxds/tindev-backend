const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const devs = require('./src/modules/devs/routes/dev');

const server = express();

server.use(cors());
server.use(express.json());
server.use('/devs', devs);

const PORT = 3000 || process.env.PORT;

mongoose
  .connect('mongodb+srv://matheus:matheus@cluster0-bempv.mongodb.net/omnistack8?retryWrites=true&w=majority',
    { useNewUrlParser: true })
  .then(() => {
    console.log('[DATABASE] - Connected!');
    server.listen(PORT, () => {
      console.log('[SERVER] - Running on port: ' + PORT);
    });
  })
  .catch(e => console.log('[DATABASE] - ERROR! ', e));

