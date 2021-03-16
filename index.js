const port = process.env.PORT || 3000
const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const CryptoJS = require("crypto-js");

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://krysprueba:123krys@cluster0.lwvn6.mongodb.net/?retryWrites=true&w=majority";

var user = {

    username: '',
    password: '',
    token: ''

};

app.get('/usersList', function(req, res) {
        
    queryUsers(req, res);
    
});

app.get('/login', function(req, res) {

    res.json({

        text: 'Login!'

    });

});

app.post('/login/student', function (req, res) {

    if (req.query.username != "" && req.query.password != "") {
 
        user.username = req.query.username;
        user.password = CryptoJS.SHA256(req.query.password);
        user.token = generateToken(user);

    } else {

        console.log("No has introducido los datos necesarios.")
        
    }

    res.json({

        user:user

    })

});

app.post('/login/teacher', function (req, res) {

    if (req.query.username != "" && req.query.password != "") {
 
        user.username = req.query.username;
        user.password = CryptoJS.SHA256(req.query.password);
        user.token = generateToken(user);

    } else {

        console.log("No has introducido los datos necesarios.")
        
    }

    res.json({

        user:user

    })

});


async function queryUsers(req, res) {

    const connection = await MongoClient.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});
    const db = connection.db('proyectomatriculas');
    const items = await db.collection('usersprova').find().toArray();
    res.send(items);
    console.log(items);
    connection.close();

  }

  async function queryUser(req, res) {

    const connection = await MongoClient.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});
    const db = connection.db('proyectomatriculas');
    const items = await db.collection('usersprova').findOne({user: "Oscar"});
    res.send(items);
    console.log(items);
    connection.close();

  }

function generateToken(user) {

    const token = jwt.sign(user, '1234student', { expiresIn: 300 });

    return token;

}

app.listen(port, function () {
   
    console.log('Api funcionando...');

});