// fichier appel express et routes 
import express from 'express'; // import from et non const require
import animalsRouter from './api/animals/route.js'; // chemin vers ton routeur

const app = express();
const port = 3001;

// Middleware pour traiter le corps des requêtes
app.use(express.json()); // pour lire les body JSON (POST, PUT)
app.use(express.urlencoded({extended: true}));


app.get('/', (req, res) => {
  res.send("Bonjour c'est Camille et Hanane 🤩");
});

app.use('/api/animals', animalsRouter); // toutes les routes animales

app.listen(port, () => {
  console.log(`Serveur adaopteBack lancé sur http://localhost:${port}`);
});