import {faker} from '@faker-js/faker';

console.log("Nom généré:", faker.person.firstName()); // Exemple : John
console.log("Âge généré:", faker.number.int({ min: 1, max: 15 })); // Exemple : 5
console.log("Description générée:", faker.lorem.sentence()); // Exemple : "Lorem ipsum dolor sit amet"
