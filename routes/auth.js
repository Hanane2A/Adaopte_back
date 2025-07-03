// ADAOPTE_BACK/routes/auth.js

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs'); // Pour le hachage des mots de passe
const jwt = require('jsonwebtoken'); // Pour la création et vérification des JWT
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient(); // Instanciation du client Prisma

// --- Middleware pour la vérification du token JWT ---
// Cette fonction sera utilisée pour protéger vos routes.
const verifyToken = (req, res, next) => {
    // Le token est généralement envoyé dans l'en-tête 'Authorization'
    // sous la forme 'Bearer VOTRE_TOKEN'.
    let token = req.headers['x-access-token'] || req.headers.authorization;

    // 1. Vérifier si un token est fourni
    if (!token) {
        return res.status(403).json({ message: 'Aucun token fourni. Accès non autorisé.' });
    }

    // 2. Extraire le token si 'Bearer ' est présent
    if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length); // Supprime 'Bearer '
    }

    // 3. Vérifier et décoder le token
    try {
        // jwt.verify() décode le token en utilisant la clé secrète.
        // Si le token est valide, 'decoded' contiendra le payload (volunteer_id, email).
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 4. Ajouter les informations de l'utilisateur à l'objet 'req'
        // Cela rend l'ID et l'email du bénévole disponibles pour les routes suivantes.
        req.user = { id: decoded.volunteer_id, email: decoded.email };
        next(); // Passe la main à la fonction de route suivante
    } catch (error) {
        // Gérer les erreurs de vérification (token invalide, expiré, etc.)
        console.error("Token verification error:", error);
        return res.status(401).json({ message: 'Token invalide ou expiré.' });
    }
};

// --- Route d'inscription d'un bénévole (Register) ---
// Méthode : POST
// Chemin : /api/auth/register (sera défini dans app.js)
router.post('/register', async (req, res) => {
    const { email, password, firstname, name } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Veuillez fournir un email et un mot de passe.' });
    }

    try {
        // 1. Vérifier si l'email est déjà utilisé
        const existingVolunteer = await prisma.volunteer.findUnique({
            where: { email: email },
        });

        if (existingVolunteer) {
            return res.status(409).json({ message: 'Cet email est déjà enregistré.' });
        }

        // 2. Hacher le mot de passe avant de le stocker
        const salt = await bcrypt.genSalt(10); // Génère un sel aléatoire
        const hashedPassword = await bcrypt.hash(password, salt); // Hache le mot de passe

        // 3. Créer le nouvel enregistrement du bénévole dans la BDD
        const newVolunteer = await prisma.volunteer.create({
            data: {
                email: email,
                mdp: hashedPassword, // Stocke le mot de passe HACHÉ
                firstname: firstname || null, // Utilise null si non fourni
                name: name || null,           // Utilise null si non fourni
                // created_at et updated_at seront gérés par Prisma si configurés avec @default(now())/@updatedAt
            },
        });

        res.status(201).json({ message: 'Compte bénévole enregistré avec succès!', volunteerId: newVolunteer.volunteer_id });

    } catch (error) {
        console.error("Erreur lors de l'enregistrement du bénévole:", error);
        res.status(500).json({ message: 'Erreur serveur lors de l\'enregistrement de l\'utilisateur.' });
    }
});

// --- Route de connexion d'un bénévole (Login) ---
// Méthode : POST
// Chemin : /api/auth/login (sera défini dans app.js)
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Veuillez fournir un email et un mot de passe.' });
    }

    try {
        // 1. Trouver le bénévole par son email
        const volunteer = await prisma.volunteer.findUnique({
            where: { email: email },
        });

        if (!volunteer) {
            return res.status(401).json({ message: 'Email ou mot de passe incorrect.' });
        }

        // 2. Comparer le mot de passe fourni avec le hachage stocké
        const isMatch = await bcrypt.compare(password, volunteer.mdp);
        if (!isMatch) {
            return res.status(401).json({ message: 'Email ou mot de passe incorrect.' });
        }

        // 3. Générer un JWT si la connexion est réussie
        const token = jwt.sign(
            { volunteer_id: volunteer.volunteer_id, email: volunteer.email }, // Payload du token
            process.env.JWT_SECRET,             // Clé secrète (du .env)
            { expiresIn: '1h' }                 // Expiration du token (ex: 1 heure)
        );

        res.status(200).json({
            message: 'Connexion réussie!',
            token: token,
            volunteerId: volunteer.volunteer_id
        });

    } catch (error) {
        console.error("Erreur lors de la connexion du bénévole:", error);
        res.status(500).json({ message: 'Erreur serveur lors de la connexion.' });
    }
});

// --- Exemple de route protégée : Récupérer le profil du bénévole authentifié ---
// Méthode : GET
// Chemin : /api/auth/profile (sera défini dans app.js)
// Cette route utilise le middleware `verifyToken` pour s'assurer que l'utilisateur est connecté.
router.get('/profile', verifyToken, async (req, res) => {
    try {
        // `req.user` est rempli par `verifyToken` avec l'ID et l'email du bénévole.
        const volunteer = await prisma.volunteer.findUnique({
            where: { volunteer_id: req.user.id },
            // Sélectionnez uniquement les champs que vous souhaitez exposer, JAMAIS le mot de passe.
            select: { volunteer_id: true, email: true, firstname: true, name: true, created_at: true, updated_at: true }
        });

        if (!volunteer) {
            return res.status(404).json({ message: 'Bénévole non trouvé.' });
        }

        res.status(200).json({
            message: 'Informations de profil du bénévole :',
            volunteer: volunteer
        });
    } catch (error) {
        console.error("Erreur lors de l'accès au profil protégé:", error);
        res.status(500).json({ message: 'Erreur serveur lors de la récupération du profil du bénévole.' });
    }
});

// Exportation du routeur et du middleware pour les utiliser dans app.js
module.exports = {
    authRouter: router,
    verifyToken // Exportez-le pour le réutiliser dans d'autres fichiers de routes si nécessaire
};