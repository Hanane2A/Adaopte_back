// adoption.js
const { PrismaClient } = require('../generated/prisma');
const express = require('express');
const router = express.Router();

const prisma = new PrismaClient();
//GET
router.get('/', async (req, res) => {
    try {
        const adoption = await prisma.adoption.findMany();
        res.json(adoption);
    } catch (error) {
        res.status(500).json({ error: 'Erreur serveur'});
    }
});

//POST
router.post('/', async (req,res) => {
    const { animal_id, adopter_id, adoption_at } = req.body;
    try {
        const newAdoption = await prisma.adoption.create({
            data: {
                animal_id,
                adopter_id,
                adoption_at,
            },
        });
        res.status(201).json(newAdoption);
    } catch (error) {
        console.error("Erreur détaillée POST /adoption:", error);
        res.status(500).json({ error : "Erreur lors de la création d'une nouvelle adoption" });
    }
});

// PUT /adoption/:id
router.put('/:id', async (req, res) => {
  console.log("Route PUT adoption appelée avec id =", req.params.id);
  const id = parseInt(req.params.id);
  const data = req.body;

  try {
    const updatedAdoption = await prisma.adoption.update({
      where: { adoption_id: id },
      data: data,
    });
    res.json(updatedAdoption);
  } catch (error) {
    console.error("Erreur mise à jour adoption:", error);
    res.status(500).json({ error: error.message });
  }
}); 


// DELETE 
router.delete('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    await prisma.adoption.delete({ 
        where: { adoption_id: id },
    });
    res.status(200).send({ message: 'Adoption supprimée' })
  } catch (error) {
    res.status(500).send({ error: 'Erreur lors de la suppression' })
  }
})



module.exports = router;