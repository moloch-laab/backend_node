'use strict'

var validator = require('validator');
var Article = require('../models/article');

var controller = {
    create: (req, res) => {
        // recoger parametros por post
        var params = req.body;

        // validar datos
        try{
            var validate_title = !validator.isEmpty(params.title);
            var validate_content = !validator.isEmpty(params.content);
        }catch(err){
            return res.status(400).send({
                message: 'Faltan datos'
            });
        }

        if (validate_title && validate_content){
            // crear el objeto a guardar
            var article = new Article();
            // asignar valores
            article.title = params.title;
            article.content = params.content;
            article.image = null
            // guardar el articulo
            article.save((err, articleStored) => {
                if (err || !articleStored){
                    return res.status(404).send({
                        message: 'El artículo no se ha guardado'
                    });
                }
                // devolver una respuesta
                return res.status(200).send({
                    article: articleStored
                });
            });
        } else {
            return res.status(400).send({
                message: 'validacion incorrecta'
            });
        }
    },

    getArticles: (req, res) => {
        var query = Article.find({});
        var last = req.params.last;
        if(last || last != undefined){
            query.limit(2);
        }
        // find
        query.sort('_id').exec((err, articles) => {
            if(err){
                return res.status(500).send({
                    message: 'Error al devolver articulos'
                });
            }

            if(!articles){
                return res.status(404).send({
                    message: 'No hay articulos para mostrar'
                });
            }

            return res.status(200).send({
                articles
            });
        });
    }
};

module.exports = controller;