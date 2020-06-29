const express = require('express');// Déclaration framework express
const bodyParser = require('body-parser');// Déclaration Body-Parser pour récupérer des objets exploitables
const mongoose = require('mongoose');// Déclaration Mongoose pour base de Données MongoDB

const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');// Déclaration du dossier des routes utilisateur
const sauce = require('./models/Sauce');


const app = express();

mongoose.connect('mongodb+srv://JacquesG_OCR:15020710@clustercoursback-6b9sv.mongodb.net/test?retryWrites=true&w=majority',
    { useNewUrlParser: true,
      useUnifiedTopology: true})
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDb échouée!'));

   
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());

app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;
