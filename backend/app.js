const dotenv = require('dotenv').config(); // Protection de l'acces à ma base de donnée
const helmet = require('helmet'); // Plugin de protection pour diverses attaques

const express = require('express');// Déclaration framework express
const bodyParser = require('body-parser');// Déclaration Body-Parser pour récupérer des objets exploitables
const mongoose = require('mongoose');// Déclaration Mongoose pour base de Données MongoDB

const sauceRoutes = require('./routes/sauce'); // Déclaration du dossier des routes Sauces
const userRoutes = require('./routes/user');// Déclaration du dossier des routes utilisateur

const sauce = require('./models/Sauce'); 
const path = require('path'); //nécessaire pour multer (importation des fichiers)
const { limiter } = require('./controllers/user');

const app = express(); 

//Déclaration base de donnée MongoDB
mongoose.connect( process.env.MONGO_URL,
    { useNewUrlParser: true,
      useUnifiedTopology: true})
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDb échouée!'));

   
app.use((req, res, next) => { //Declaration Cors et Methods
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(helmet());
app.use(bodyParser.json());

app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;
