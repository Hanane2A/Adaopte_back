// fichier appel express et routes =======================================

require('dotenv').config(); // Charge les variables d'environnement

const express = require('express');
const app = express();
const port = process.env.PORT || 3001;

const animalRouter = require('./routes/animal'); // importe BDD animal
const adopterRouter = require('./routes/adopter');
const adoptionRouter = require('./routes/adoption');
const shelterRouter = require('./routes/shelter'); // importe BDD shelter
const volunteerRouter = require('./routes/volunteer');

const authRouter = require('./routes/auth'); // route authentification 


app.use(express.json()); // Middleware pour parser les requêtes JSON (très important pour les requêtes POST/PUT)

app.get('/', (req , res)=> {
    res.send("Bonjour c'est Camille et Hanane 🤩");
});

app.use('/animal', animalRouter);
app.use('/adopter', adopterRouter);
app.use('/adoption', adoptionRouter);
app.use('/shelter', shelterRouter);
app.use('/volunteer', volunteerRouter);

app.use('/auth', authRouter);



app.listen(port, ()=>{
    console.log(`Serveur adaopteBack sur http://localhost:${port}`);
});



