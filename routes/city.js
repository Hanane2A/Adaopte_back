const express = require('express');
const { PrismaClient } = require('../generated/prisma');
const router = express.Router();

const prisma = new PrismaClient();

// 🔎 GET all cities
router.get('/', async (req, res) => {
  try {
    const cities = await prisma.city.findMany();
    console.log("Loading of cities DONE");
    res.json(cities);
  } catch (error) {
    console.error("Erreur récupération des villes :", error);
    res.status(500).json({ error: "Erreur serveur lors de la récupération des villes" });
  }
});

// 🔎 GET city by ID
router.get('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const city = await prisma.city.findUnique({
      where: { city_id: id },
    });

    if (!city) {
      return res.status(404).json({ error: "Ville non trouvée" });
    }

    res.json(city);
  } catch (error) {
    console.error("Erreur récupération ville :", error);
    res.status(500).json({ error: "Erreur serveur lors de la récupération de la ville" });
  }
});

// ➕ POST create city
router.post('/', async (req, res) => {
  const { name, zipcode } = req.body;

  if (!name || !zipcode) {
    return res.status(400).json({ error: "Nom et code postal requis." });
  }

  try {
    const newCity = await prisma.city.create({
      data: {
        name,
        zipcode,
      },
    });

    res.status(201).json(newCity);
  } catch (error) {
    console.error("Erreur création ville :", error);
    res.status(500).json({ error: "Erreur serveur lors de la création de la ville" });
  }
});

// ✏️ PUT update city
router.put('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const { name, zipcode } = req.body;

  try {
    const updatedCity = await prisma.city.update({
      where: { city_id: id },
      data: {
        name,
        zipcode,
      },
    });

    res.json(updatedCity);
  } catch (error) {
    console.error("Erreur mise à jour ville :", error);
    res.status(500).json({ error: "Erreur serveur lors de la mise à jour de la ville" });
  }
});

// ❌ DELETE city
router.delete('/:id', async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const city = await prisma.city.findUnique({
      where: { city_id: id },
    });

    if (!city) {
      return res.status(404).json({ error: "Ville non trouvée" });
    }

    await prisma.city.delete({
      where: { city_id: id },
    });

    res.json({ message: "Ville supprimée avec succès" });
  } catch (error) {
    console.error("Erreur suppression ville :", error);
    res.status(500).json({ error: "Erreur serveur lors de la suppression de la ville" });
  }
});

module.exports = router;

