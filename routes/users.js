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
               passwordConfirmation : req.body.passwordConfirmation,
            });

            res.redirect('/users');
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
        const user = await User.findByPk(req.params.username);
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
            const user = await User.findByPk(req.params.username);
            res.render('users/show', {user:user});
        }catch(err){
            console.error(err);
            next(err);
        }
    })
    //update
    .put(async (req,res,next)=>{
        try{
            User.update({
                currentPassword : req.body.currentPassword,
            },{
                where : {username : req.body.username},
            });

            User.update({
                username : req.body.username,
                name : req.body.name,
                email : req.body.email,
                newPassword : req.body.newPassword,
                password : req.body.newPassword? req.body.newPassword : password,
                passwordConfirmation : req.body.passwordConfirmation,
            },{
                where : {username : req.body.username},
            });
    
            res.redirect('/users/'+ User.username);
        }catch(err){
            console.error(err);
            next(err);
        }
    })
    //destory
    .delete(async(req,res,next)=>{
        try{
            User.destroy({
                where : {username:req.params.username},
            });
            res.redirect('/users');
        }catch(err){
            console.error(err);
            next(err);
        }
    });

module.exports = router;