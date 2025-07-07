// fichier appel express et routes =======================================

const express = require('express');
const app = express();
const port = 3001;

const animalRouter = require('./routes/animal'); // importe BDD animal
const adopterRouter = require('./routes/adopter');
const adoptionRouter = require('./routes/adoption');

app.use(express.json()); // Middleware pour parser les requêtes JSON (très important pour les requêtes POST/PUT)

app.get('/', (req , res)=> {
    res.send("Bonjour c'est Camille et Hanane 🤩");
});

app.use('/animal', animalRouter);
app.use('/adopter', adopterRouter);
app.use('/adoption', adoptionRouter);

app.listen(port, ()=>{
    console.log(`Serveur adaopteBack sur http://localhost:${port}`);
});


//la partie authentification:================================================

