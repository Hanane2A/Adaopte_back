// fichier appel express et routes 

const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req , res)=> {

    res.send("Bonjour c'est Camille et Hanane 🤩");
});

app.listen(port, ()=>{

    console.log(`Serveur adaopteBack sur http://localhost:${port}`);
    
});