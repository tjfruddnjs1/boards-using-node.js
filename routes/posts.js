const express = require('express');

const Post = require('../models/post');
const router = express.Router();

router.route('/')
    //index
    .get(async (req,res,next)=>{
        try{
            const posts = await Post.findAll({
                order : [["createdAt", "DESC"]],
            });
            res.render('posts/index', {posts:posts});
        }catch(err){
            console.error(err);
            next(err);
        }
    })
    //create
    .post(async (req,res,next)=>{
        try{
            Post.create({
                title : req.body.title,
                body : req.body.body,
            });
            res.redirect('/posts');
        }catch(err){
            console.error(err);
            next(err);
        }
    });

    //new
router.get('/new', async(req,res,next) =>{
    try{
        res.render('posts/new');
    }catch(err){
        console.error(err);
        next(err);
    }
});

//edit
router.get('/:id/edit', async(req,res,next)=>{
    try{
        const post = await Post.findByPk(req.params.id);
        res.render('posts/edit', {post : post});
    }catch(err){
        console.error(err);
        next(err);
    }
});

router.route('/:id')
    //show
    .get(async (req,res,next)=>{
        try{
            const post = await Post.findByPk(req.params.id);
            res.render('posts/show', {post:post});
        }catch(err){
            console.error(err);
            next(err);
        }
    })
    //update
    .put(async (req,res,next)=>{
        try{
            req.body.updatedAt = Date.now();
            Post.update({
                title : req.body.title,
                body : req.body.body,
                updatedAt : req.body.updatedAt,
            },{
                where : {id : req.params.id},
            });
            res.redirect('/posts');
        }catch(err){
            console.error(err);
            next(err);
        }
    })
    //destory
    .delete(async(req,res,next)=>{
        try{
            Post.destroy({
                where : {id:req.params.id},
            });
            res.redirect('/posts');
        }catch(err){
            console.error(err);
            next(err);
        }
    });

module.exports = router;