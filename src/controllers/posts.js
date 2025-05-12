const {request, response} = require('express');
const post = require('../models/post');

const getPostById = async (req = request, res = response) => {
    const user_id = req.body;

    try {
        const aux_post = await post.findOne(user_id);
        if (!aux_post) {
            return res.status(400).json({
                message: "Publicacion no encontrada"
            });
        }


    } catch (error) {
        console.log(error.message, error);
        res.status(500).json({
            message: 'Error al recuperar la publicacion',
            error
        });
    }
}

const getPosts = async (req = request, res = response) => {
    const user_id = req.body;

    try {
        const aux_post = await post.findOne(user_id);
        if (!aux_post) {
            return res.status(400).json({
                message: "Publicacion no encontrada"
            });
        }


    } catch (error) {
        console.log(error.message, error);
        res.status(500).json({
            message: 'Error al recuperar la publicacion',
            error
        });
    }
}

const createPost = async (req = request, res = response) => {
    const { title, content, multimedia } = req.body;
    const user_id = req.user._id;

    try {
        const newPost = new post({
            title,
            content,
            multimedia,
            user_id
        });

        await newPost.save();

        res.status(201).json({
            message: 'Publicacion creada con exito',
            post: newPost
        });
    } catch (error) {
        console.log(error.message, error);
        res.status(500).json({
            message: 'Error al crear la publicacion',
            error
        });
    }
}

module.exports = {
    getPostById,
    getPosts,
    createPost
}