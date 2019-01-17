var express = require('express');
var router = express.Router();
var User = require('../models/user');
var jwt = require('jsonwebtoken');
var secret = 'socialnetworksecret';

/* GET home page. */


router.post('/users', function (req, res) {
      if( req.body.password == null || req.body.password == '' || req.body.email == null || req.body.email == ''){
          console.log('reached check');
            res.json({message:'Missing Input!!!', success: false});
      }else{
          User.findOne({'email': req.body.email}, function (err, user) {
              if(err){
                  res.json({message:'Error!!', success: false});
              }else{
              if(user){
                  res.json({message:'User already Registered..Go to Login', success: false});
              }else{
                  var newuser = new User();
                  newuser.email = req.body.email;
                  newuser.password = newuser.encryptPassword(req.body.password);
                  newuser.save(function (err, result) {
                      if(err){
                          res.json({message:'Error !!', success: false});
                      }
                      res.json({message:'Successfully saved!!', success: true});
                  });
                  }
              }

          });
      }
});


router.post('/login', function (req, res) {
    console.log('reached users login');

    if( req.body.password == null || req.body.password == '' || req.body.email == null || req.body.email == ''){
        console.log('reached check');
        res.json({message:'lola input to de', success: false});
    }else{

        User.findOne({'email': req.body.email}, function (err, user) {
            if(err){
                res.json({message:'lola input to de', success: false});
            }else{
                if(!user){
                    res.json({message:'no user', success: false});
                }else{
                    if(!user.validPassword(req.body.password)){
                        res.json({message:'Wrong Password!!', success: false});
                    }else {
                        var token = jwt.sign({email: user.email}, secret, { expiresIn: '1h' });
                        res.json({message: 'success', success: true, token: token});
                    }
                }
            }
        });
    }
});

module.exports = router;
