
// hashVolunteers.js
const { PrismaClient } = require('./generated/prisma'); // adapter si besoin
const bcryptjs = require('bcryptjs');
const prisma = new PrismaClient();

async function hashPasswords() {
  const volunteers = await prisma.volunteer.findMany();

  for (const volunteer of volunteers) {
    const isHashed = volunteer.mdp.startsWith('$2'); // Vérifie si déjà hashé (bcryptjs commence par $2)
    
    if (!isHashed) {
      const hashed = await bcryptjs.hash(volunteer.mdp, 10); // Salt rounds = 10
      await prisma.volunteer.update({
        where: { volunteer_id: volunteer.volunteer_id },
        data: { mdp: hashed },
      });
      console.log(`✅ Hashed password for: ${volunteer.email}`);
    } else {
      console.log(`🔒 Already hashed: ${volunteer.email}`);
    }
  }

  await prisma.$disconnect();
}

hashPasswords().catch((e) => {
  console.error(e);
  prisma.$disconnect();
});
