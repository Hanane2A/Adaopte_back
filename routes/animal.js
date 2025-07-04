const express = require ('express');
const {PrismaClient} = require ('../generated/prisma');
// const {PrismaClient} = require ('@prisma/client'); je ne comprends pas !!


const router = express.Router();
const prisma = new PrismaClient();



router.get('/', async(req, res)=>{

        try{
            const animal = await prisma.animal.findMany();
            res.json(animal);
        } catch(error){

            console.error("Erreur bdd animal :", error);
            res.status(500).json({message: "Erreur serveur BDD animaux."});
            
        }
});

module.exports = router;