

const express = require('express');
const {PrismaClient} = require ('../generated/prisma');


// Vos futures routes CRUD pour les bénévoles ici
// Exemple: router.get('/', (req, res) => { res.send('Liste des bénévoles'); });

const router = express.Router();
const prisma = new PrismaClient();

router.get( '/', async(req, res)=>{

    try{
        const volunteer = await prisma.volunteer.findMany();
        res.json(volunteer);
    }catch(error){

        console.error('Erreur BDD volunteer :', error);
        res.status(500).json({message: 'Erreur serveur BDD volunteer.'}); 
    }

});

router.post('/', async(req, res)=>{

    const{firstname, name, email, mdp, city_id, availability,  motivation, created_at, update_at} = req.body;
    try{
        const newVolunteer = await prisma.volunteer.create({
            data:{
                firstname,
                name,
                email,
                mdp,
                city_id,
                availability,
                motivation,
                created_at,
                update_at,

            },
        });
        res.status(201).json(newVolunteer);
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
        const updatedvolunteer = await prisma.volunteer.update({
            where:{ volunteer_id: id},
            data: data,
        });
        res.json(updatedvolunteer);
    } catch(error){
        console.error("Erreur :", error);
        res.status(500).json({error: "WTH ERROR !!!!!"})        
    }
});


 //route delete (pour supprimer une donnée)

router.delete('/:id' , async (req, res) => {

    const id = parseInt(req.params.id);

    try{
        const volunteer = await prisma.volunteer.findUnique({
            where: {volunteer_id: id}
        });

        if(!volunteer){
             return res.status(404).json({ message: "volunteer non trouvé." });
        }
        const deletedVolunteer = await prisma.volunteer.delete({

            where:{ volunteer_id: id},
        
        });

        res.json(deletedVolunteer);
} catch (error){
    console.error("Erreur lors de la suppression : " );
    res.status(500).json({ error: "Erreur BDD volunteer"})
    
}
});



module.exports = router;
