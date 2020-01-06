'use strict'

var express = require('express');
var ArticleController = require('../controllers/article');

var router = express.Router();

// Rutas de la app
router.post('/api/articles/create', ArticleController.create);
router.get('/api/articles/:last?', ArticleController.getArticles);

module.exports = router;