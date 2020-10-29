var express = require('express');
var router = express.Router();

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/AtProject" ;

// Connect to the db

//Inserting initial user details
var MongoClient = require('mongodb').MongoClient;

// Get All 
router.get('/tasks', function(req, res, next){
    
    MongoClient.connect(url, function (err, db) {

        if(err) throw err;
        var dbo = db.db("AtProject");

        // dbo.collection('user_details').insertOne({ user_id: 1, password: 'admin' });
        // dbo.collection('user_details').insertOne({ user_id: 2,  password: 'admin123' });
        // dbo.collection('user_details').insertOne({ user_id: 3,  password: 'user' });


        dbo.collection("user_details").find({}).toArray(function(err, result) {
            if (err) throw err;
            // for(var i=0;i<result.length;i++){
                res.json(result);
            // }
            
            // res.render('index.html');
            db.close();
       });
    });
    
});

module.exports = router;