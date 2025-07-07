// adopter.js
const { PrismaClient } = require('../generated/prisma');
const express = require('express');
const router = express.Router();

const prisma = new PrismaClient();

router.get('/', async (req, res) => {
    try {
        const adopters = await prisma.adopter.findMany();
        res.json(adopters);
    } catch (error) {
        res.status(500).json({ error: 'Erreur serveur' });
    }
});



// POST nouvel adopter
router.post('/', async (req,res) => {
  const { name, address, city_id, tel, email, date_birth, adoption_motivation } = req.body;
  try {
    const newAdopter = await prisma.adopter.create({
      data: {
        name,
        address,
        city_id,
        tel,
        email,
        date_birth: date_birth ? new Date(date_birth) : null, // transformer en Date si présent
        adoption_motivation,
      },
    });
    res.status(201).json(newAdopter);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la création de l’adopter' });
  }
});

// PUT /adopter/:id
router.put('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const data = req.body;
  try {
    const updatedAdopter = await prisma.adopter.update({
      where: { adopter_id: id },
      data: data,
    });
    res.json(updatedAdopter);
  } catch (error) {
        console.error(error); // <= Affiche l'erreur dans la console
    res.status(500).json({ error: "Erreur lors de la mise à jour" });
  }
});


// DELETE
router.delete('/:id', async (req, res) => {
const id = parseInt(req.params.id);
try {
  const deleteAdopter = await prisma.adopter.delete({
    where: {adopter_id: id},
  })
  res.json({ message: 'Adoptant.te supprimé.e avec succès'})
} catch (error) {
  console.error(error);
  res.status(500).json({error: " Erreur lors de la suppression" });
}
});





module.exports = router;