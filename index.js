// Imports
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const { Db } = require('mongodb')
const MongoClient = require('mongodb').MongoClient
const CryptoJS = require("crypto-js")
const jwt = require('jsonwebtoken')

// Server instance
const app = express();

// Global variables
const port = process.env.PORT || 5000
const mongoURL = 'mongodb+srv://admin:admin@cluster0.lwvn6.mongodb.net/?retryWrites=true&w=majority'
const mongoDB = 'proyectomatriculas'



app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors());

// Token

const secretKey = 'jwt_key'

app.use((req, res, next) => {

    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Content-Type, access-token, Access-Control-Allow-Origin')
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE')
    next()
  
});

// ENDPOINTS

app.get('/', (req, res) => {

    res.send('API working successfully!')
  
});

app.get('/ifToken/showData', checkingToken, (req, res) => { 

    const data = [
        {
            "id":"1",
            "numero":1
        },
        {
            "id":"2",
            "numero":2
        },
        {
            "id":"3",
            "numero":3
        }
    ]

    res.status(200).send(data)

})

// LOGIN / USER

app.post('/login/user', (req, res) => {

    userEmail = req.body.email
    userPassword = CryptoJS.SHA256(req.body.password).toString(CryptoJS.enc.Hex)
  
    MongoClient.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, client) {
  
      if (err) throw err
  
      const db = client.db(mongoDB)
  
      db.collection('users').findOne({email: userEmail, password: userPassword}, {projection: {token: 0} }, function(err, user) {
  
        if (err) throw err
  
        if (user != null) {
  
            res.status(200).send({"token":generateToken(user, true)})
  
        } else {
  
            res.status(400).send('Invalid credentials')
  
        }
  
        client.close()
  
      });
  
    });
  
  });

// LOGIN / ADMIN

app.post('/login/admin', (req, res) => {

    adminEmail = req.body.email
    adminPassword = CryptoJS.SHA256(req.body.password).toString(CryptoJS.enc.Hex)
  
    MongoClient.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, client) {
  
      if (err) throw err
  
      const db = client.db(mongoDB)
  
      db.collection('admins').findOne({email: adminEmail, password: adminPassword}, {projection: {token: 0} }, function(err, admin) {
  
        if (err) throw err
  
        if (admin != null) {

            res.status(200).send({"token":generateToken(admin, true)})
  
        } else {
  
            res.status(400).send('Invalid credentials')
  
        }
  
        client.close()
  
      });
  
    });
  
  });

// TOKEN / GENERATION

function generateToken(user, isAdmin) {

    if (isAdmin) {

        collectionName = 'admins'

    } else {

        collectionName = 'users'

    }

    token = jwt.sign(user, secretKey, { expiresIn: '5m' })

    MongoClient.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, client) {

        if (err) throw err

        const db = client.db(mongoDB)

        db.collection(collectionName).updateOne({ email: user.email }, { $set: {token: token} }, {projection: {password: 0} }, function(err, user) {

            if (err) throw err
            
            client.close()

        });

    });
    
    return token

}

// TOKEN / CHECKING

const checkingToken = express.Router()

checkingToken.use((req, res, next) => {

    const token = req.headers['access-token']

    if (token) {

        jwt.verify(token, secretKey, (err, decoded) => { 

            if (err) {
                
                res.send('Invalid token')

            }

            req.decoded = decoded
            
            next()

        });

    } else {

        res.send('Invalid token')

    }

});

// GET COURSES

//CFPM    AF30

// app.get('/courses/read', function(req, res) {

//     if (req.query.id != undefined) {

//         MongoClient.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, db) {

//             if (err) throw err;
    
//             var dbo = db.db(mongoDB);
//             dbo.collection('cicloformativo').find({CODI_CICLE_FORMATIU: req.query.course_code}).project({_id: 0, NOM_MODUL: 1, NOM_UNITAT_FORMATIVA: 1}).toArray(function(err, result) {
    
//                 if (err) throw err;

//                 if (result.length > 0) {

//                     res.status(200).send({"status":"OK","message":result});

//                 } else {

//                     res.status(400).send({"status":"ERROR","message:":"No hay ningun ciclo con ese codigo"})
//                 }
    
//                 db.close();
    
//             });
    
//         });

//     } else {

//         MongoClient.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, db) {

//             if (err) throw err;
    
//             var dbo = db.db(mongoDB);
//             dbo.collection('cicloformativo').find({}).project({_id: 0, CODI_CICLE_FORMATIU: 1, NOM_CICLE_FORMATIU: 1}).toArray(function(err, result) {
    
//                 if (err) throw err;
    
//                 res.status(200).send({"status":"OK","message":result});
//                 db.close();
    
//             });
    
//         });

//     }
    
// });

// GET STUDENTS

// app.get('/students/read', function(req, res) {

//     if (req.query.course_code != undefined) {

//         MongoClient.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, db) {

//             if (err) throw err;
    
//             var dbo = db.db(mongoDB);
//             dbo.collection('studentsprova').find({course_code: req.query.course_code}).project({_id: 0}).toArray(function(err, result) {
    
//                 if (err) throw err;

//                 if (result.length > 0) {

//                     res.status(200).send({"status":"OK","message":result});

//                 } else {

//                     res.status(400).send({"status":"ERROR","message:":"No hay ningun ciclo con ese codigo"});
//                 }
    
//                 db.close();
    
//             });
    
//         });

//     } else if (req.query.id != undefined) {

//         MongoClient.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, db) {

//             if (err) throw err;
    
//             var dbo = db.db(mongoDB);
//             dbo.collection('studentsprova').findOne({ralc_id: req.query.id} , function(err, result) {
    
//                 if (err) throw err;

//                 if (result != null) {

//                     res.status(200).send({"status":"OK","message":result});

//                 } else {

//                     res.status(400).send({"status":"ERROR","message:":"No hay ningun alumno con esa ID"});

//                 }
    
//                 db.close();
    
//             });
    
//         });

//     } else {

//         res.status(400).send({"status":"ERROR","message:":"Datos no introducidos."})

//     }
    
// });

// REQUERIMENTS

// app.post('/requirements/create', function(req, res) {

//     MongoClient.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, db) {
//         var dbo = db.db(mongoDB);

//     var json = req.body;

//     importJsonToDB(json, "perfils");

//     });

// });

// STUDENTS CSV TO ARRAY 


// INSERT JSON TO COLLECTION

// function insertJsonToDB(json, collectionName) {

//     MongoClient.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, db) {

//         var dbo = db.db(mongoDB);

//         dbo.collection(collectionName).insertOne(json), function(err, result) {

//             if (err) throw err;

//         }

//     });

// }

app.listen(port, function () {
   
    console.log('Api listening at port ', port, '...');

});