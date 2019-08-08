const express = require('express');
const devController = require('../controllers/dev');
const likeController = require('../controllers/likes');
const dislikeController = require('../controllers/dislikes');

const routes = express.Router();

routes.get('/', devController.index);

routes.post('/:devId/likes', likeController.store);
routes.post('/:devId/dislikes', dislikeController.store);
routes.post('/', devController.store);

module.exports = routes;
