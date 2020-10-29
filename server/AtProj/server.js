// var express = require('express');
// var path = require('path');
// var bodyParser = require('body-parser');

// var index = require('./routes/index');
// var info = require('./routes/info');
// var login = require('./routes/user/login');

// var port = 3000;

// var app = express();
// var cors = require('cors');

// //View Engine
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');
// app.engine('html', require('ejs').renderFile);

// // Set Static Folder
// app.use(express.static(path.join(__dirname, 'client')));

// // Body Parser MW
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: false}));
// app.use(cors());

// app.use('/', index);
// app.use('/api', info);

// app.listen(port, function(){
//     console.log('Server started on port '+port);
// });
const express = require('express');
// var appRoutes = require("./routes/user");
const mongoose = require('mongoose')
var bodyParser = require('body-parser');
var cors = require('cors');
var login = require('./routes/api');
const PORT = 4000;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
const url = 'mongodb://localhost:27017/AtProject'
mongoose.connect(url, { useNewUrlParser: true })
const con = mongoose.connection
con.on('open', () => {
    console.log("database connected");
})

// app.use('/users', appRoutes);
app.get('/', (req, res) => {
    console.log("hi");
});
app.use('/api', login);
app.listen(PORT, () => {
    console.log("running server on port " + PORT);
})