// fichier appel express et routes 
import express from 'express'; // import from et non const require
import animalsRouter from './api/animals/route.js'; // chemin vers ton routeur
import dotenv from 'dotenv';
import pool from './api/animals/route.js';

dotenv.config();

const app = express();
const port = 3001;

app.use(express.json()); // pour lire les body JSON (POST, PUT)

app.get('/', (req, res) => {
  res.send("Bonjour c'est Camille et Hanane 🤩");
});

app.use('/api/animals', animalsRouter); // toutes les routes animales

app.listen(port, () => {
  console.log(`Serveur adaopteBack lancé sur http://localhost:${port}`);
});