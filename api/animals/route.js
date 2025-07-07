import express from 'express';
// import pkg from 'pg';
import {Pool} from 'pg';

const router = express.Router()

const pool = new Pool({
  connectionString:'postgresql://neondb_owner:npg_iWcH3YqEnz0p@long-forest-a9571386-pooler.gwc.azure.neon.tech/neondb?sslmode=require',
  ssl: { rejectUnauthorized: false },
});

// router.get('/', async (req, res) => {
//     console.log("Route/api/animals atteinte");
//     try {
//         const result = await pool.query(`
//             SELECT a.*, s.city_id, s.volunteer_id
//             FROM animals a
//             LEFT JOIN animal_shelter s ON a.animal_shelter_id = s.id
//             WHERE a.statut = $1
//             LIMIT 100
//         `, ['disponible']);
//         console.log(result.rows);  // Log des résultats pour voir ce qui est retourné
//         res.json(result.rows);
//     } catch (error) {
//         console.error('Erreur lors de la requête :', error);
//         res.status(500).json({error: 'Rhaaa ça marche toujours pas !'});
//     }
// });

// Fonction pour tester la connexion
const checkConnection = async () => {
    try {
        const res = await pool.query('SELECT NOW()');
        console.log('Connexion réussie:', res.rows[0]);
    } catch (err) {
        console.error('Erreur de connexion à la base de données:', err);
    }
};

checkConnection(); // Appeler la fonction ici pour tester la connexion

router.get('/', async (req, res) => {
    console.log("Route /api/animals atteinte");
    try {
        const result = await pool.query('SELECT * FROM animals WHERE statut = $1 LIMIT 100', ['disponible']);
        console.log(result.rows);
        res.json(result.rows);
    } catch (error) {
        console.error('Erreur lors de la requête :', error);
        res.status(500).json({error: 'Rhaaa ça marche toujours pas !'});
    }
});

export default router;