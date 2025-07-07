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

//route POST(pour ajouter une donnée)
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

//route delete (pour supprimer une donnée)

router.delete('/:id' , async (req, res) => {

    const id = parseInt(req.params.id);

    try{
        const shelter = await prisma.animal_shelter.findUnique({
            where: {animal_shelter_id: id}
        });

        if(!shelter){
             return res.status(404).json({ message: "Shelter non trouvé." });
        }
        const deletedShelter = await prisma.animal_shelter.delete({

            where:{ animal_shelter_id: id},
        
        });

        res.json(deletedShelter);
} catch (error){
    console.error("Erreur lors de la suppression : " );
    res.status(500).json({ error: "Erreur BDD Shelter"})
    
}
});


module.exports = router;