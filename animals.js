import { faker } from '@faker-js/faker';
import { Client } from 'pg';

const client = new Client({
    user: 'neondb_owner',
    host: 'long-forest-a9571386-pooler.gwc.azure.neon.tech',
    database: 'neondb',
    password: 'npg_iWch3YqEnz0p',
    port: 5432,
    ssl: { rejectUnauthorized: false },
});

const types = ['chien', 'chat', 'lapin', 'équidé', 'rongeur'];
const sexes = ['mâle', 'femelle'];
const statuses = ['disponible', 'adopté'];

const getBreedForType = (type) => {
    const breeds = {
        chien: ['Labrador', 'Berger Allemand', 'Shiba Inu', 'Bichon', 'Bulldog Anglais', 'Chihuahua', 'Teckel', 'Bouvier bernois', 'Beagle', 'Boxer'],
        chat: ['Siamois', 'Maine Coon', 'Persan', 'Chartreux', 'Bengal', 'Ragdoll', 'British Shorthair', 'Norvégien', 'Sphynx', 'Bleu Russe'],
        lapin: ['Bélier', 'Nain', 'Angora', 'Rex', 'Satin', 'Tête de Lion', 'Chinchilla', 'Fauve de Bourgogne', 'Papillon', 'Californien'],
        equide: ['Pur-sang', 'Camarguais', 'Frison', 'Haflinger', 'Quarter Horse', 'Paint Horse', 'Mérens', 'Shetland', 'Welsh', 'Connemara'],
        rongeur: ['Hamster Doré', 'Hamster Russe', 'Hamster Roborovski', 'Hamster Chinois', 'Cochon d’Inde Rosette', 'Cochon d’Inde Péruvien', 'Cochon d’Inde Abyssinien', 'Cochon d’Inde Shelty', 'Gerbille Mongole', 'Souris blanche domestique'],
    };
    return breeds[type] || [];
};

async function main() {
    await client.connect();

    for (let i = 0; i < 100; i++) {
        const type = types[Math.floor(Math.random() * types.length)];
        const sexe = sexes[Math.floor(Math.random() * sexes.length)];
        const statut = statuses[0]; // Tous disponibles par défaut

        // Sélection de la race
        const breed = getBreedForType(type)[Math.floor(Math.random() * getBreedForType(type).length)];

        const query = `
            INSERT INTO animals (name, age, breed, type, description, sexe, image_url, statut, date_arrivee, animal_shelter_id)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
            RETURNING id
        `;

        const values = [
            faker.person.firstName(),
            faker.number.int({ min: 1, max: 15 }),
            breed,
            type,
            faker.lorem.sentence(),
            sexe,
            `https://source.unsplash.com/400x300/?${type}`,
            statut,
            faker.date.past(2).toISOString().split('T')[0], // Date d'arrivée
            1, // animal_shelter_id fixe
        ];

        await client.query(query, values); // Exécution de l'insertion

        console.log(`Animal créé avec le nom: ${values[0]}, type: ${type}, race: ${breed}`);
    }

    await client.end();
    console.log('Insertion terminée');
}

main().catch(console.error);