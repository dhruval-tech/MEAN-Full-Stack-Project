const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')
const db = "mongodb://localhost:27017/AtProject";
// mongoose.Promise = global.Promise;

mongoose.connect(db, function(err){
    if(err){
        console.error('Error! ' + err)
    } else {
      console.log('Connected to mongodb')      
    }
});

function verifyToken(req, res, next) {
  if(!req.headers.authorization) {
    return res.status(401).send('Unauthorized request')
  }
  let token = req.headers.authorization.split(' ')[1]
  if(token === 'null') {
    return res.status(401).send('Unauthorized request')    
  }
  let payload = jwt.verify(token, 'secretKey')
  if(!payload) {
    return res.status(401).send('Unauthorized request')    
  }
  req.userId = payload.subject
  next()
}



router.post('/register', (req, res) => {
  let userData = req.body
  let user = new User(userData)
  user.save((err, registeredUser) => {
    if (err) {
      console.log(err)      
    } else {
      let payload = {subject: registeredUser._id}
      let token = jwt.sign(payload, 'secretKey')
      res.status(200).send({token})
    }
  })
})

router.post('/login', (req, res) => {
//   let userData = req.body;
//   User.findOne({user_id: userData.userId}, (err, user) => {
//     if (err) {
//       console.log(err)    
//     } 
//     else {
//       if (userData==null) {
//         console.log(userData);

//         res.status(401).send('Invalid Email')
//       } else 
//       if ( user.password !== userData.password) {
//         res.status(401).send('Invalid Password')
//       } else {
        
//         let payload = {subject: user._id}
//         let token = jwt.sign(payload, 'secretKey')
//         res.status(200).send({token})
//       }
//     }
//   })
        // if(err) throw err;
    //     let user = req.body;
    //     User.findOne({
    //         user_id : req.body.userId, 
    //         // password : req.body.password
    //     }, function(err, user){
    //         console.log(user);
    //         if(err) throw err;
    //         if(){	
    //             return res.status(200).json({
    //                 status: 'success',
    //                 data: user
    //             })
    //         } else {
    //             return res.status(200).json({
    //                 status: 'fail',
    //                 message: 'Login Failed'
    //             })
    //         }
            
    // })

    let msg = "success";

    const { user_id, password } = req.body;
    try {
      let user =  User.findOne({
        user_id
      });
      if (!user)
        return res.status(400).json({
          message: "User Not Exist"
        });

      const isMatch =  bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({
          message: "Incorrect Password !"
        });

      const payload = {
        user: {
          id: user._id
        }
      };
      jwt.sign(
        payload,
        "randomString",
        {
          expiresIn: 3600
        },
        (err, token) => {
          if (err) throw err;
          res.status(200).json({
             msg: "Login successfull",
             token: token
          });
        }
      );
    } catch (e) {
      console.error(e);
      res.status(500).json({
        message: "Server Error"
      });
    }
});

module.exports = router;