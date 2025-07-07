import pkg from 'pg';
import {faker} from '@faker-js/faker';
const {Client} = pkg;

const client = new Client({
    user: 'neondb_owner',
    host: 'long-forest-a9571386-pooler.gwc.azure.neon.tech',
    database: 'neondb',
    password: 'npg_iWch3YqEnz0p',
    port: 5432,
    ssl: {rejectUnauthorized: false} // Nécessaire pour Neon
});

const types = ['chien', 'chat', 'lapin', 'équidé', 'rongeur'];
const sexes = ['mâle', 'femelle'];
const statuses = ['disponible', 'adopté'];

const getBreedForType = (type) => {
const breeds = {
    chien: ['Labrador', 'Berger Allemand', 'Shiba Inu', 'Bichon', 'Bulledog Anglais', 'Chihuahua', 'Teckel', 'Bouvier bernois', 'Beagle', 'Boxer'],
    chat: ['Siamois','Maine Coon','Persan','Chartreux','Bengal','Ragdoll','British Shorthair','Norvégien','Sphynx','Bleu Russe'],
    lapin: ['Bélier','Nain','Angora','Rex','Satin','Tête de Lion','Chinchilla','Fauve de Bourgogne','Papillon','Californien'],
    equide: ['Pur-sang','Camarguais','Frison','Haflinger','Quarter Horse','Paint Horse','Mérens','Shetland','Welsh','Connemara'],
    rongeur: ['Hamster Doré','Hamster Russe','Hamster Roborovski','Hamster Chinois','Cochon d’Inde Rosette','Cochon d’Inde Péruvien','Cochon d’Inde Abyssinien','Cochon d’Inde Shelty','Gerbille Mongole','Souris blanche domestique'],

}
return breeds[type] || []; // Retourne une liste vide si le type n'existe pas
}


async function main() {
    await client.connect();

    for (let i = 0; i < 100; i++) {
        const type = types[Math.floor(Math.random() * types.length)];
        const sexe = sexes[Math.floor(Math.random() * sexes.length)];
        const statut = statuses[0]; // tous dispo au départ

        const query = `
        INSERT INTO animals (name, age, breed, type, description, sexe, image_url, statut, date_arrivee, animal_shelter_id)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        RETURNING id
        `;

    
        const values = [
            faker.name.firstName(),
            faker.datatype.number({min: 1, max: 15}),
            breed,
            type,
            faker.lorem.sentence(),
            sexe,
            `https://source.unsplash.com/400x300/?${type}`,
            statut,
            faker.date.past(2).toISOString().split('T')[0], // date d'arrivée format YYYY-MM-DD
            1, // animal_shelter_id fixe (à adapter)
        ];


        await client.connect();
        const res = await client.query('SELECT 1');
        console.log('Connexion réussie', res.rows[0]);

        //  const res = await client.query(query, values);
        //  console.log(`Animal crée avec id ${res.rows[0]}`)

         }

         await client.end();
         console.log('Insertion terminée');
}

main().catch(console.error);

