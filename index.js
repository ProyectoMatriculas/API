const port = process.env.PORT || 3000
const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const CryptoJS = require("crypto-js");
const cors = require('cors');

const MongoClient = require('mongodb').MongoClient;
const mongoURL = "mongodb+srv://krysprueba:123krys@cluster0.lwvn6.mongodb.net/?retryWrites=true&w=majority";
const mongoDB = "proyectomatriculas";

app.use(cors());

// LOGIN STUDENT

app.post('/login/student', function(req, res) {
        
    if (req.query.email != undefined & req.query.password != undefined) {

        MongoClient.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, db) {

            if (err) throw err;
    
            var dbo = db.db(mongoDB);
            dbo.collection('usersprova').findOne({name: req.query.email}, function(err, result) {
    
                if (err) throw err;

                if (result != null) {

                    if (result.password == CryptoJS.SHA256(req.query.password)) {

                        generateToken(result);

                        res.status(200).send({"status":"OK","message":result.token});
                        
                    } else {

                        res.status(400).send({"status":"ERROR","message:":"Las passwords no coinciden"});
                    }

                } else {

                    res.status(400).send({"status":"ERROR","message:":"No hay ningun usuario registrado con ese email"});

                }
    
                db.close();
    
            });
    
        });

    } else {

        res.status(400).send({"status":"ERROR","message:":"No se ha introducido email y password."})

    }

});

// LOGIN ADMIN

app.post('/login/admin', function(req, res) {
        
    if (req.query.email != undefined & req.query.password != undefined) {

        MongoClient.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, db) {

            if (err) throw err;
    
            var dbo = db.db(mongoDB);
            dbo.collection('usersprova').findOne({name: req.query.email}, function(err, result) {
    
                if (err) throw err;

                if (result != null) {

                    if (result.password == CryptoJS.SHA256(req.query.password)) {

                        generateToken(result);

                        res.status(200).send({"status":"OK","message":result.token});
                        
                    } else {

                        res.status(400).send({"status":"ERROR","message:":"Las passwords no coinciden"});
                    }

                } else {

                    res.status(400).send({"status":"ERROR","message:":"No hay ningun usuario registrado con ese email"});

                }
    
                db.close();
    
            });
    
        });

    } else {

        res.status(400).send({"status":"ERROR","message:":"No se ha introducido email y password."})

    }

});

// GET COURSES

//CFPM    AF30

app.get('/courses/read', function(req, res) {

    if (req.query.id != undefined) {

        MongoClient.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, db) {

            if (err) throw err;
    
            var dbo = db.db(mongoDB);
            dbo.collection('cicloformativo').find({CODI_CICLE_FORMATIU: req.query.course_code}).project({_id: 0, NOM_MODUL: 1, NOM_UNITAT_FORMATIVA: 1}).toArray(function(err, result) {
    
                if (err) throw err;

                if (result.length > 0) {

                    res.status(200).send({"status":"OK","message":result});

                } else {

                    res.status(400).send({"status":"ERROR","message:":"No hay ningun ciclo con ese codigo"})
                }
    
                db.close();
    
            });
    
        });

    } else {

        MongoClient.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, db) {

            if (err) throw err;
    
            var dbo = db.db(mongoDB);
            dbo.collection('cicloformativo').find({}).project({_id: 0, CODI_CICLE_FORMATIU: 1, NOM_CICLE_FORMATIU: 1}).toArray(function(err, result) {
    
                if (err) throw err;
    
                res.status(200).send({"status":"OK","message":result});
                db.close();
    
            });
    
        });

    }
    
});

// GET STUDENTS

app.get('/students/read', function(req, res) {

    if (req.query.course_code != undefined) {

        MongoClient.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, db) {

            if (err) throw err;
    
            var dbo = db.db(mongoDB);
            dbo.collection('alumnos').find({CODI_CICLE_FORMATIU: req.query.course_code}).project({_id: 0, NOM_ALUMNE: 1, CODI_CICLE_FORMATIU: 1}).toArray(function(err, result) {
    
                if (err) throw err;

                if (result.length > 0) {

                    res.status(200).send({"status":"OK","message":result});

                } else {

                    res.status(400).send({"status":"ERROR","message:":"No hay ningun ciclo con ese codigo"});
                }
    
                db.close();
    
            });
    
        });

    } else if (req.query.id != undefined) {

        MongoClient.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, db) {

            if (err) throw err;
    
            var dbo = db.db(mongoDB);
            dbo.collection('cicloformativo').find({_id: req.query.id}).project({_id: 0, NOM_ALUMNE:1, NOM_CICLE_FORMATIU:1}).toArray(function(err, result) {
    
                if (err) throw err;

                if (result != null) {

                    res.status(200).send({"status":"OK","message":result});

                } else {

                    res.status(400).send({"status":"ERROR","message:":"No hay ningun alumno con esa ID"});

                }
    
                db.close();
    
            });
    
        });

    } else {

        res.status(400).send({"status":"ERROR","message:":"Datos no introducidos."})

    }
    
});

// TOKEN

function generateToken(user) {

    secretkey = '';

    console.log('User is admin? ', user.isAdmin);

    if (user.isAdmin) {

        secretkey = '123admin';

    } else {

        secretkey = '123student';

    }

    user.token = jwt.sign(user, secretkey, { expiresIn: 3600 });

    MongoClient.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, db) {

        if (err) throw err;

        var dbo = db.db(mongoDB);
        dbo.collection('usersprova').updateOne({ name: user.username }, { $set: {token: user.token} }, function(err, result) {

            if (err) throw err;

            console.log("Token actualizado");
            db.close();

        });

    });

}

app.listen(port, function () {
   
    console.log('Api funcionando en el puerto ', port, '...');

});