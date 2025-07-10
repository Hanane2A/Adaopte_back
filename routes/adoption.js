
// adoption.js
const { PrismaClient } = require('../generated/prisma');
const express = require('express');
const router = express.Router();

const prisma = new PrismaClient();

// ==============================
// GET : Récupère toutes les adoptions
// ==============================
router.get('/', async (req, res) => {
  try {
    const adoptions = await prisma.adoption.findMany();
    res.json(adoptions);
  } catch (error) {
    console.error("Erreur GET /adoption:", error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// ==============================
// POST : Crée une nouvelle adoption
// ==============================
router.post('/', async (req, res) => {
  const { animal_id, adopter_id, adoption_at } = req.body;

  try {
    const newAdoption = await prisma.adoption.create({
      data: {
        animal_id,
        adopter_id,
        adoption_at: new Date(adoption_at), // ✅ conversion format date ISO
      },
    });

    res.status(201).json(newAdoption);
  } catch (error) {
    console.error("Erreur détaillée POST /adoption:", error);
    res.status(500).json({ error: "Erreur lors de la création d'une nouvelle adoption" });
  }
});

// ==============================
// PUT : Mise à jour d'une adoption existante
// ==============================
router.put('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const data = req.body;

  // S'assurer que adoption_at (si présent) est bien converti
  if (data.adoption_at) {
    data.adoption_at = new Date(data.adoption_at);
  }

  try {
    const updatedAdoption = await prisma.adoption.update({
      where: { adoption_id: id },
      data: data,
    });

    res.json(updatedAdoption);
  } catch (error) {
    console.error("Erreur PUT /adoption:", error);
    res.status(500).json({ error: error.message });
  }
});

// ==============================
// DELETE : Supprime une adoption
// ==============================
router.delete('/:id', async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    await prisma.adoption.delete({
      where: { adoption_id: id },
    });

    res.status(200).json({ message: 'Adoption supprimée' });
  } catch (error) {
    console.error("Erreur DELETE /adoption:", error);
    res.status(500).json({ error: 'Erreur lors de la suppression' });
  }
});

module.exports = router;
