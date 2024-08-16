const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
const bodyParser = require('body-parser')
const multer = require('multer');
const path = require('path');
const session = require('express-session');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const auth = require('./controllers/auth');




//ROUTER
const VehiculeRouter = require('./routes/vehicule') 
const LocationRouter = require("./routes/location")
const ClientRouter = require("./routes/client")
const ProprietaireRouter = require("./routes/proprietaire")
const AdminRouter = require("./routes/admin")
const Authentification = require("./routes/auth")
const UserRouter = require('./routes/user');

// codage du mot de passe
const SECRET_KEY = 'jwtSecret1234567890';
const app = express(); 
app.use(cors())
app.use(express.json()) // Ilaina ref mandefa données avy any amin'ny front
const db = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "",
    database: "kotrana"
})

// Add headers before the routes are defined
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  //Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization');
  // Set to true if you need the websit to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)

  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

app.use(cors({ origin: 'http://localhost:5173', credentials: true })); // Autoriser les requêtes depuis l'URL du frontend et inclure les cookies de session
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Pour utiliser la session
app.use(session({
  secret: 'jwtSecret1234567890', // Clé secrète pour signer la session, remplacez-la par votre propre clé
  resave: false,
  saveUninitialized: false
}));


// Endpoint pour récupérer les informations de l'utilisateur
app.get('/user', auth, (req, res) => {
  const { id, name, email } = req.user;
  // Renvoyer les informations de l'utilisateur
  res.json({ id, name, email });
});
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use("/vehicule", auth, VehiculeRouter)
app.use("/location", auth, LocationRouter)
app.use("/client", auth, ClientRouter)
app.use("/proprietaire", auth, ProprietaireRouter)
app.use("/admin", AdminRouter)
app.use(Authentification);


app.listen(8800,() => {
    console.log("A l'écoute du port 8800")
})