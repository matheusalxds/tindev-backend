const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const devs = require('./src/modules/devs/routes/dev');

const app = express();
const server = require('http').Server(app);
const PORT = 3050 || process.env.PORT;
const io = require('socket.io')(server);

const connectedUsers = {};

io.on('connection', socket => {
  const { user } = socket.handshake.query;
  connectedUsers[user] = socket.id;
});

// middleware to insert io and connectedUsers in req param
app.use((req, res, next) => {
  req.io = io;
  req.connectedUsers = connectedUsers;

  return next();
});

app.use(cors());
app.use(express.json());
app.use('/devs', devs);

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

