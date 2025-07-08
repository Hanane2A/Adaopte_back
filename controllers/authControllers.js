const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// const { PrismaClient } = require('@prisma/client');
const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

exports.register = async (req, res) => {
    const { email, mdp, firstname, name } = req.body;

    if (!email || !mdp) {
        return res.status(400).json({ message: 'Veuillez fournir un email et un mot de passe.' });
    }

    try {
        const existingVolunteer = await prisma.volunteer.findUnique({ where: { email } });
        if (existingVolunteer) {
            return res.status(409).json({ message: 'Cet email est déjà utilisé.' });
        }

        const hashedmdp = await bcrypt.hash(mdp, 10);

        const newVolunteer = await prisma.volunteer.create({
            data: {
                email,
                mdp: hashedmdp,
                firstname: firstname || null,
                name: name || null,
            },
        });

        res.status(201).json({ message: 'Compte créé avec succès.', volunteerId: newVolunteer.volunteer_id });
    } catch (err) {
        console.error("Erreur register:", err);
        res.status(500).json({ message: 'Erreur serveur.' });
    }
};

exports.login = async (req, res) => {
    console.log("je suis dans login");
    
    const { email, mdp } = req.body;

    if (!email || !mdp) {
        return res.status(400).json({ message: 'Veuillez fournir un email et un mot de passe.' });
    }

    try {
        const volunteer = await prisma.volunteer.findUnique({ where: { email } });
        if (!volunteer) {
            return res.status(401).json({ message: 'Je ne trouve pas cette personne!' });
        }

        // const isMatch = await bcrypt.compare(mdp, volunteer.mdp);
        // if (!isMatch) {
        //     return res.status(401).json({ message: 'Email ou mot de passe incorrect.' });
        // }

        // const token = jwt.sign(
        //     { volunteer_id: volunteer.volunteer_id, email: volunteer.email },
        //     process.env.JWT_SECRET,
        //     { expiresIn: '1h' }
        // );

        res.status(200).json({
            message: 'Connexion réussie.',
            // token,
            volunteerId: volunteer.volunteer_id
        });
    } catch (err) {
        console.error("Erreur login:", err);
        res.status(500).json({ message: 'Erreur serveur.' });
    }
};

exports.getProfile = async (req, res) => {
    try {
        const volunteer = await prisma.volunteer.findUnique({
            where: { volunteer_id: req.user.id },
            select: {
                volunteer_id: true,
                email: true,
                firstname: true,
                name: true,
                created_at: true,
                update_at: true
            }
        });

        if (!volunteer) {
            return res.status(404).json({ message: 'Bénévole non trouvé.' });
        }

        res.status(200).json({ message: 'Profil récupéré.', volunteer });
    } catch (err) {
        console.error("Erreur profil:", err);
        res.status(500).json({ message: 'Erreur serveur.' });
    }
};
