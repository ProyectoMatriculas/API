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

// Login / User

app.post('/login/user', (req, res) => {

    userEmail = req.body.email
    userPassword = CryptoJS.SHA256(req.body.password).toString(CryptoJS.enc.Hex)
  
    MongoClient.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, client) {
  
      if (err) throw err
  
      const db = client.db(mongoDB)
  
      db.collection('users').findOne({email: userEmail, password: userPassword}, {projection: {token: 0} }, function(err, user) {
  
        if (err) throw err
  
        if (user != null) {
  
            res.status(200).send(generateToken(user, true))
  
        } else {
  
            res.status(400).send('Invalid credentials')
  
        }
  
        client.close()
  
      });
  
    });
  
  });

// Login / Admin

app.post('/login/admin', (req, res) => {

    adminEmail = req.body.email
    adminPassword = CryptoJS.SHA256(req.body.password).toString(CryptoJS.enc.Hex)
  
    MongoClient.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, client) {
  
      if (err) throw err
  
      const db = client.db(mongoDB)
  
      db.collection('admins').findOne({email: adminEmail, password: adminPassword}, {projection: {token: 0} }, function(err, admin) {
  
        if (err) throw err
  
        if (admin != null) {

            res.status(200).send(generateToken(admin, true))
  
        } else {
  
            res.status(400).send('Invalid credentials')
  
        }
  
        client.close()
  
      });
  
    });
  
  });

// Token / Generation

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

        db.collection(collectionName).updateOne({ email: user.email }, { $set: {token: token} } , function(err) {

            if (err) throw err
            
            client.close()

        });

    });
    
    return token

}

// Token / Checking

const checkingToken = express.Router()

checkingToken.use((req, res, next) => {

    const token = req.headers['access-token']

    if (token) {

        jwt.verify(token, secretKey, (err, decoded) => { 

            if (err) {
                
                res.status(400).send('Invalid token')

            }

            req.decoded = decoded
            
            next()

        });

    } else {

        res.status(400).send('Invalid token')

    }

});

// Token / Test Endpoint

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

// Courses

// Insert courses list

app.post('/courses/create', checkingToken, (req, res) => {

    coursesList = req.body

    MongoClient.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, client) {

        if (err) throw err
    
        const db = client.db(mongoDB)
    
        db.collection('courses').insert(coursesList, function(err) {
  
            if (err) throw err
            
            res.status(200).send('Courses inserted successfully')
    
            client.close() 
    
        });  
    
      });

})

// Get all courses

app.get('/courses/getAll', checkingToken, (req, res) => {

    MongoClient.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, client) {

        if (err) throw err
    
        const db = client.db(mongoDB)
    
        db.collection('courses').find().toArray(function(err, courses) {
    
          if (err) throw err
    
          res.status(200).send(courses)

          client.close()
    
        });
    
      });

})

// Get an specific course by code

app.get('/courses/getByCode', checkingToken, (req, res) => {

    MongoClient.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, client) {

        if (err) throw err
    
        const db = client.db(mongoDB)
    
        db.collection('courses').findOne({CODI_CICLE_FORMATIU: req.query.code}, function(err, course) {
  
            if (err) throw err
      
            if (course != null) {
    
                res.status(200).send(course)
      
            } else {
      
                res.status(400).send('There is no course with that ID')
      
            }
      
            client.close()
      
        });
    
    });

})

// Students

// Insert students list

app.post('/students/create', checkingToken, (req, res) => {

    studentsList = req.body

    MongoClient.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, client) {

        if (err) throw err
    
        const db = client.db(mongoDB)
    
        db.collection('students').insert(studentsList, function(err) {
  
            if (err) throw err
            
            res.status(200).send('Students inserted successfully')
    
            client.close() 
    
        });  
    
      });

})

// Get a list of students by course code

app.get('/students/getByCourseCode', checkingToken, (req, res) => {

    MongoClient.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, client) {

        if (err) throw err
    
        const db = client.db(mongoDB)
    
        db.collection('students').find({codi_ensenyament_P1: req.query.code}).toArray(function(err, students) {
  
            if (err) throw err
      
            if (students != null) {
    
                res.status(200).send(students)
      
            } else {
      
                res.status(400).send('Students not found')
      
            }
      
            client.close()
      
        });
    
    });

})

app.get('/students/getByRALC', checkingToken, (req, res) => {

    MongoClient.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, client) {

        if (err) throw err
    
        const db = client.db(mongoDB)
    
        db.collection('students').findOne({identficacio_RALC: req.query.ralc}, function(err, student) {
  
            if (err) throw err
      
            if (student != null) {
    
                res.status(200).send(student)
      
            } else {
      
                res.status(400).send('Student not found with that RALC.')
      
            }
      
            client.close()
      
        });
    
    });

})

// REQUERIMENTS

// app.post('/requirements/create', function(req, res) {

//     MongoClient.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, db) {
//         var dbo = db.db(mongoDB);

//     var json = req.body;

//     importJsonToDB(json, "perfils");

//     });

// });

app.listen(port, function () {
   
    console.log('Api listening at port ', port, '...');

});