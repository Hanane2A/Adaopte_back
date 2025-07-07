import express from 'express';
import pkg from 'pg';
const {Pool} = pkg;

const router = express.Router()

const pool = new Pool({
  connectionString: 'postgresql://neondb_owner:npg_iWcH3YqEnz0p@long-forest-a9571386-pooler.gwc.azure.neon.tech/neondb?sslmode=require',
  ssl: { rejectUnauthorized: false },
});

// async function test() {
//   try {
//     const res = await pool.query('SELECT NOW()');
//     console.log('Connexion OK, date:', res.rows[0]);
//     process.exit(0);
//   } catch (err) {
//     console.error('Erreur connexion DB:', err);
//     process.exit(1);
//   }
// }

// test();

router.get('/', async (req, res) => {
    try {
        const result = await pool.query(`
      SELECT a.*, s.city_id, s.volunteer_id
      FROM animals a
      LEFT JOIN animal_shelter s ON a.animal_shelter_id = s.id
      WHERE a.statut = $1
      LIMIT 100
    `, ['disponible']);
     res.json(result.rows);
    } catch(error) {
        console.error(error);
        res.status(500).json({error: 'Erreur serveur'});
    }
});

export default router;