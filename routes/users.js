const express = require('express');

const User = require('../models/user');
const router = express.Router();

router.route('/')
    .get(async(req,res,next)=>{
        try{
            const users = await User.findAll({
                order : [["username", "ASC"]],
            });
            res.render('users/index', {users:users});
        }catch(err){
            console.error(err);
            next(err);
        }
    })

    .post(async(req,res,next)=>{
        try{
            User.create({
               username : req.body.username,
               password : req.body.password,
               name : req.body.name,
               email : req.body.email,
            });
            req.redirect('/users');
        }catch(err){
            console.error(err);
            next(err);
        }
    });

router.get('/new', async(req,res,next) =>{
    try{
        res.render('users/new');
    }catch(err){
        console.error(err);
        next(err);
    }
});

//edit
router.get('/:username/edit', async(req,res,next)=>{
    try{
        const user = await Post.findByPk(req.params.username);
        res.render('users/edit', {user : user});
    }catch(err){
        console.error(err);
        next(err);
    }
});

router.route('/:username')
    //show
    .get(async (req,res,next)=>{
        try{
            const user = await Post.findByPk(req.params.username);
            res.render('users/show', {user:user});
        }catch(err){
            console.error(err);
            next(err);
        }
    })
    //update
    .put(async (req,res,next)=>{
        try{
            Post.update({
                username : req.body.username,
                password : req.body.password,
                name : req.body.name,
                email : req.body.email,
            },{
                where : {username : req.params.username},
            });
            res.redirect('/users');
        }catch(err){
            console.error(err);
            next(err);
        }
    })
    //destory
    .delete(async(req,res,next)=>{
        try{
            Post.destroy({
                where : {username:req.params.username},
            });
            res.redirect('/users');
        }catch(err){
            console.error(err);
            next(err);
        }
    });

module.exports = router;