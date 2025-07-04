const express = require ('express');
const {PrismaClient} = require ('../generated/prisma');
// const {PrismaClient} = require ('@prisma/client'); je ne comprends pas !!


const router = express.Router();
const prisma = new PrismaClient();



router.get('/', async(req, res)=>{

        try{
            const shelter = await prisma.animal_shelter.findMany();
            res.json(shelter);
        } catch(error){

            console.error("Erreur bdd shelter :", error);
            res.status(500).json({message: "Erreur serveur BDD shelter."});
            
        }
});

//route POSTn(piur ajouter une donnée)
router.post('/', async(req, res)=>{

    const{name, address, city_id, volunteer_id} = req.body;
    try{
        const newShelter = await prisma.animal_shelter.create({
            data:{
                name,
                address,
                city_id,
                volunteer_id,
            },
        });
        res.status(201).json(newShelter);
    } catch(error){
        console.error("Erreur :", error);
        res.status(500).json({error})        
    }
});

//route PUT (pour changer une donnée)
router.put('/:id', async(req, res)=>{ // faudra revoir l'info /:id
   const id = parseInt(req.params.id);
   const data = req.body;
    try{
        const updatedShelter = await prisma.animal_shelter.update({
            where:{ animal_shelter_id: id},
            data: data,
        });
        res.json(updatedShelter);
    } catch(error){
        console.error("Erreur :", error);
        res.status(500).json({error: "WTH ERROR !!!!!"})        
    }
});






module.exports = router;