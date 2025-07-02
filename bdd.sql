-- 1 table adopters==================================================
DROP TABLE IF EXISTS adopters;
CREATE TABLE adopters (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    address TEXT NOT NULL,
    city_id BIGINT, 
    tel TEXT UNIQUE,
    email TEXT UNIQUE,
    date_birth DATE,
    adoption_motivation TEXT,
    CONSTRAINT fk_city FOREIGN KEY (city_id) REFERENCES cities(id) ON DELETE SET NULL 

);
INSERT INTO adopters (name, address, city_id, tel, email, date_birth, adoption_motivation) VALUES
('Antoine Dupont', '15 Rue de la Paix, Paris', 1, '0711223344', 'antoine.d@example.com', '1985-03-10', 'Cherche un compagnon calme pour mon appartement.'),
('Sophie Dubois', '22 Avenue des Champs, Marseille', 2, '0722334455', 'sophie.d@example.com', '1990-07-25', 'Grande maison avec jardin, beaucoup d’amour à donner.'),
('Lucas Martin', '8 Boulevard de la Croix Rousse, Lyon', 3, '0733445566', 'lucas.m@example.com', '1978-11-01', 'Envie d’adopter un chien senior, pour lui offrir une belle fin de vie.'),
('Manon Lefevre', '5 Place du Capitole, Toulouse', 4, '0744556677', 'manon.l@example.com', '1995-01-18', 'Passionnée par les chats, recherche un chaton à élever.'),
('Hugo Bernard', '3 Rue Sainte-Catherine, Bordeaux', 5, '0755667788', 'hugo.b@example.com', '1982-09-05', 'Besoin d’un animal de compagnie pour briser la solitude.'),
('Camille Petit', '10 Rue de la Liberté, Nice', 6, '0766778899', 'camille.p@example.com', '1988-04-30', 'Ma famille est prête à accueillir un nouvel membre.'),
('Nathan Durand', '7 Boulevard des Belges, Lille', 7, '0777889900', 'nathan.d@example.com', '1992-12-12', 'Je travaille à domicile et peux offrir beaucoup d’attention.'),
('Louise Leroy', '4 Place de la Comédie, Montpellier', 8, '0788990011', 'louise.l@example.com', '1980-06-20', 'Ancienne bénévole en refuge, je veux adopter cette fois-ci.'),
('Théo Garcia', '9 Quai Saint-Jean, Strasbourg', 9, '0799001122', 'theo.g@example.com', '1975-02-14', 'Recherche un animal de petite taille, compatible avec un appartement.'),
('Chloé Rousseau', '6 Rue des Augustins, Rennes', 10, '0700112233', 'chloe.r@example.com', '1993-08-08', 'J’ai toujours eu des animaux, c’est le moment d’en adopter un autre.');


--  2 table cities============================================================================

DROP TABLE IF EXISTS cities;
CREATE TABLE cities (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  zipcode TEXT NOT NULL
);

INSERT INTO cities (name, zipcode) VALUES
('Paris', '75001'),
('Marseille', '13001'),
('Lyon', '69001'),
('Toulouse', '31000'),
('Nice', '06000'),
('Nantes', '44000'),
('Strasbourg', '67000'),
('Montpellier', '34000'),
('Bordeaux', '33000'),
('Lille', '59000');


--  3 table volunteers===========================================================================

DROP TABLE IF EXISTS volunteers;
create table volunteers(
id integer primary key generated always as identity,
firstname text,
name text,
email text,
mdp text,
city_id integer,
availability date,
animal_shelter_id integer,
motivation varchar,
created_at date,
update_at date,
CONSTRAINT fk_city FOREIGN KEY (city_id) REFERENCES cities(id) ON DELETE SET NULL,
CONSTRAINT fk_animal_shelter_ FOREIGN KEY (animal_shelter_id) REFERENCES animal_shelters(id) ON DELETE SET NULL 
);


INSERT INTO volunteers (firstname, name, email,mdp, city_id, availability, animal_shelter_id, motivation, created_at, update_at)
VALUES
('Alice', 'Dupont', 'alice.dupont@example.com', 'passAlice123', 1, '2025-07-15', 1, 'Aimerait aider les animaux', '2025-07-01', '2025-07-01'),
('Bob', 'Martin', 'bob.martin@example.com', 'passBob456', 2, '2025-07-20', 2, 'Passionné par la cause animale', '2025-07-01', '2025-07-01'),
('Carole', 'Petit', 'carole.petit@example.com', 'passCarole789', 1, '2025-07-22', 1, 'Souhaite donner de son temps', '2025-07-01', '2025-07-01'),
('David', 'Durand', 'david.durand@example.com', 'passDavid101', 3, '2025-07-18', 3, 'Contribuer au bien-être animal', '2025-07-01', '2025-07-01'),
('Eve', 'Lefevre', 'eve.lefevre@example.com', 'passEve202', 2, '2025-07-25', 2, 'Engagée pour la protection animale', '2025-07-01', '2025-07-01'),
('Frank', 'Bernard', 'frank.bernard@example.com', 'passFrank303', 4, '2025-08-01', 4, 'Intéressé par le bénévolat', '2025-07-01', '2025-07-01'),
('Grace', 'Thomas', 'grace.thomas@example.com', 'passGrace404', 3, '2025-08-05', 3, 'Aime les chats et les chiens', '2025-07-01', '2025-07-01'),
('Hugo', 'Robert', 'hugo.robert@example.com', 'passHugo505', 1, '2025-08-10', 1, 'Désire aider les refuges locaux', '2025-07-01', '2025-07-01'),
('Ines', 'Richard', 'ines.richard@example.com', 'passInes606', 5, '2025-08-12', 5, 'Sensible à la cause animale', '2025-07-01', '2025-07-01'),
('Julien', 'Dubois', 'julien.dubois@example.com', 'passJulien707', 4, '2025-08-15', 4, 'Cherche à faire une différence', '2025-07-01', '2025-07-01'),
('Sophie', 'Moreau', 'sophie.moreau@example.com', 'passSophie808', 5, '2025-08-20', 1, 'Aide les animaux en détresse', '2025-07-02', '2025-07-02'),
('Marc', 'Laurent', 'marc.laurent@example.com', 'passMarc909', 1, '2025-08-22', 2, 'Volontaire pour les animaux', '2025-07-02', '2025-07-02'),
('Laura', 'Simon', 'laura.simon@example.com', 'passLaura111', 2, '2025-08-25', 3, 'Soutien les refuges', '2025-07-02', '2025-07-02'),
('Thomas', 'Michel', 'thomas.michel@example.com', 'passThomas222', 3, '2025-08-28', 4, 'Donne de son temps pour les animaux', '2025-07-02', '2025-07-02'),
('Chloe', 'Garcia', 'chloe.garcia@example.com', 'passChloe333', 4, '2025-09-01', 5, 'Passionnée par le bien-être animal', '2025-07-02', '2025-07-02'),
('Antoine', 'Roux', 'antoine.roux@example.com', 'passAntoine444', 5, '2025-09-05', 1, 'Aime les animaux et la nature', '2025-07-02', '2025-07-02'),
('Manon', 'Leroy', 'manon.leroy@example.com', 'passManon555', 1, '2025-09-08', 2, 'Désire contribuer à la cause', '2025-07-02', '2025-07-02'),
('Nicolas', 'Dubois', 'nicolas.dubois@example.com', 'passNicolas666', 2, '2025-09-10', 3, 'Engagé pour les animaux', '2025-07-02', '2025-07-02'),
('Emma', 'Bertrand', 'emma.bertrand@example.com', 'passEmma777', 3, '2025-09-12', 4, 'Sensible à la protection animale', '2025-07-02', '2025-07-02'),
('Lucas', 'Fontaine', 'lucas.fontaine@example.com', 'passLucas888', 4, '2025-09-15', 5, 'Cherche à aider les animaux', '2025-07-02', '2025-07-02');


--  4 table animal-shelters ===========================================================================
DROP TABLE IF EXISTS animal_shelters;
CREATE TABLE animal_shelters (  

id BIGSERIAL PRIMARY KEY,  
name TEXT NOT NULL,  
address TEXT,  
city_id BIGINT,  
volunteer_id BIGINT,
CONSTRAINT fk_city FOREIGN KEY (city_id) REFERENCES cities(id) ON DELETE RESTRICT, -- Un refuge doit toujours être dans une ville existante
CONSTRAINT fk_volunteer FOREIGN KEY (volunteer_id) REFERENCES volunteers(id) ON DELETE SET NULL -- Si un bénévole est supprimé, le lien du refuge peut devenir NULL
);

INSERT INTO animal_shelters (name, address, city_id, volunteer_id) VALUES
('Refuge des Animaux Parisiens', '12 Rue de la Paix', 1, 1),
('Foyer Canin Marseillais', '25 Avenue du Prado', 2, 2),
('Abri des Chats Lyonnais', '8 Rue de la République', 3, 3),
('Centre de Sauvetage Toulousain', '3 Place du Capitole', 4, 4),
('La Maison des Bêtes Niçoises', '10 Rue Masséna', 5, 5),
('Refuge des Animaux Nantais', '50 Rue de la Fosse', 6, 1),
('SPA de Strasbourg', '1 Rue du Dôme', 7, 2),
('Abri des Animaux Montpelliérains', '15 Rue de la Loge', 8, 3),
('Foyer Canin Bordelais', '20 Cours de l''Intendance', 9, 4),
('Centre de Sauvetage Lillois', '7 Rue de Béthune', 10, 5),
('Refuge du Vieux Port', '1 Quai de Rive Neuve', 2, NULL);

-- 5 table animals=======================================================
CREATE TABLE animals (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    date_birth DATE,
    breed TEXT,
    type TEXT,
    description varchar,
    sexe TEXT,
    animal_shelter_id BIGINT,
    img_url text,
    CONSTRAINT fk_animal_shelter FOREIGN KEY (animal_shelter_id) REFERENCES animal_shelters(id) ON DELETE SET NULL
    );

INSERT INTO animals (name, date_birth, breed, type, description, sexe, animal_shelter_id, img_url) VALUES
('Charlie', '2020-07-02', 'Pug', 'Chien', 'Charlie est un petit chien calme et affectueux qui adore les balades tranquilles et les caresses sur le canapé.', 'Mâle', NULL, '/images/charlesdeluvio-K4mSJ7kc0As-unsplash.jpg'),
('Mia', '2023-07-02', 'Chat noir et blanc', 'Chat', 'Mia est une boule de tendresse curieuse et joueuse, toujours prête à ronronner près de vous.', 'Femelle', NULL, '/images/manja-vitolic-gKXKBY-C-Dk-unsplash.jpg'),
('Coco', '2024-07-02', 'Lapin', 'Lapin', 'Coco est un petit lapin plein d''énergie, très doux et parfait pour un foyer aimant et paisible.', 'Femelle', NULL, '/images/chan-swan-NKyl19P5IHg-unsplash.jpg'),
('Rex', '2021-07-02', 'Chow-chow', 'Chien', 'Rex est un chien loyal et majestueux, idéal pour une personne douce et patiente qui aime les câlins silencieux.', 'Mâle', NULL, '/images/alan-king-KZv7w34tluA-unsplash.jpg'),
('Luna', '2022-07-02', 'Chat Roux', 'Chat', 'Luna adore les coins ensoleillés et les siestes à vos côtés. Elle vous offrira tout l''amour d''un regard félin.', 'Femelle', NULL, '/images/jae-park-7GX5aICb5i4-unsplash.jpg'),
('Biscuit', '2025-04-02', 'Cochon d''Inde', 'Rongeur', 'Biscuit est tout petit mais plein de vie ! Il aime les légumes croquants et les instants de douceur en famille.', 'Mâle', NULL, '/images/yosei-g-OVgE3m4MHKM-unsplash.jpg'),
('Rio', '2025-02-02', 'Lapin nain brun', 'Lapin', 'Rio est discret, mignon comme tout, et adore explorer les petits coins de la maison avec délicatesse.', 'Mâle', NULL, '/images/melanie-kreutz-IFnknR2Mv5o-unsplash.jpg'),
('Ruby', '2023-07-02', 'Chien Samoyed', 'Chien', 'Ruby est une boule de neige pleine d''amour ! Elle adore les promenades et les câlins par temps frais.', 'Femelle', NULL, '/images/peri-stojnic-5Vr_RVPfbMI-unsplash.jpg'),
('Sparky', '2019-07-02', 'Golden Retriever', 'Chien', 'Sparky est un chien énergique et très joueur, idéal pour une famille active qui aime les longues promenades et les jeux en extérieur.', 'Mâle', NULL, '/images/sparky-golden-retriever.jpg'),
('Pixel', '2024-10-02', 'Perroquet Vert', 'Oiseau', 'Pixel est un perroquet intelligent et curieux qui aime interagir et apprendre de nouveaux mots. Il a besoin de beaucoup d''attention.', 'Mâle', NULL, '/images/pixel-green-parrot.jpg');



-- 6 table adoptions

DROP TABLE IF EXISTS adoptions;
create table adoptions(
id integer primary key generated always as identity,
animal_id integer,
adopter_id integer,
adoption_at date,
CONSTRAINT fk_animal FOREIGN KEY (animal_id) REFERENCES animals(id) ON DELETE RESTRICT,
CONSTRAINT fk_adopter FOREIGN KEY (adopter_id) REFERENCES adopters(id) ON DELETE RESTRICT
);

INSERT INTO adoptions (animal_id, adopter_id, adoption_at) VALUES
(7, 12, '2024-03-20'),
(2, 5, '2024-01-10'),
(9, 18, '2024-06-05'),
(1, 3, '2023-11-15'),
(5, 9, '2024-02-28'),
(10, 1, '2024-04-12'),
(4, 15, '2024-01-01'),
(8, 7, '2024-05-30'),
(3, 20, '2024-03-01'),
(6, 11, '2024-02-14'),
(1, 10, '2024-05-22'), 
(2, 14, '2023-12-01'),
(7, 6, '2024-04-25'),
(5, 17, '2024-06-15'),
(3, 2, '2024-01-25');




