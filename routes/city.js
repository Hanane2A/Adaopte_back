// city.js
const { PrismaClient } = require('../generated/prisma');
const express = require('express');
const router = express.Router();

const prisma = new PrismaClient();

// GET /city/:id
router.get('/city/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const city = await prisma.city.findUnique({
            where: { id: id }
        });
        if (!city) {
            return res.status(404).json({ error: "Ville non trouvée" });
        }
        res.json(city);
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la récupération de la ville" });
    }
});

// PUT /city/:id
router.put('/city/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const { name, country } = req.body;
    
    try {
        const updatedCity = await prisma.city.update({
            where: { id },
            data: { name, country }
        });
        res.json(updatedCity);
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la mise à jour de la ville" });
    }
});

// POST /city
router.post('/city', async (req, res) => {
    const { name, country } = req.body;  // Exemple de champs pour une ville

    try {
        const newCity = await prisma.city.create({
            data: {
                name,
                country, // ou tout autre champ nécessaire
            }
        });
        res.status(201).json(newCity);  // Retourne la ville nouvellement créée
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la création de la ville" });
    }
});

// DELETE /city/:id
router.delete('/city/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const deletedCity = await prisma.city.delete({
            where: { id },
        });
        res.json({ message: 'Ville supprimée avec succès' });
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la suppression de la ville" });
    }
});
