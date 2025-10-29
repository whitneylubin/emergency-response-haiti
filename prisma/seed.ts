import { PrismaClient, RequestStatus, RequestType, Role, Source } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const communes = [
  'Port-au-Prince',
  'Cap-Haïtien',
  'Les Cayes',
  'Jérémie',
  'Jacmel',
  'Gonaïves',
  'Hinche',
  'Fort-Liberté',
  'Miragoâne',
  'Petit-Goâve'
];

const statuses = [
  RequestStatus.NEW,
  RequestStatus.IN_REVIEW,
  RequestStatus.DISPATCHED,
  RequestStatus.RESOLVED,
  RequestStatus.REJECTED
];

const types = [
  RequestType.FOOD,
  RequestType.WATER,
  RequestType.MEDICAL,
  RequestType.SHELTER,
  RequestType.CONNECTIVITY,
  RequestType.OTHER
];

async function main() {
  const passwordAdmin = await bcrypt.hash('Admin!234', 10);
  const passwordResponder = await bcrypt.hash('Responder!234', 10);
  const passwordCitizen = await bcrypt.hash('Citizen!234', 10);

  await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      passwordHash: passwordAdmin,
      role: Role.ADMIN,
      name: 'Admin User',
    },
  });

  await prisma.user.upsert({
    where: { email: 'responder@example.com' },
    update: {},
    create: {
      email: 'responder@example.com',
      passwordHash: passwordResponder,
      role: Role.RESPONDER,
      name: 'Responder User',
    },
  });

  await prisma.user.upsert({
    where: { email: 'citizen@example.com' },
    update: {},
    create: {
      email: 'citizen@example.com',
      passwordHash: passwordCitizen,
      role: Role.CITIZEN,
      name: 'Citizen User',
    },
  });

  const existing = await prisma.request.count();
  if (existing >= 25) return;

  const requests = Array.from({ length: 25 }).map((_, idx) => ({
    type: types[idx % types.length],
    description: `Sample request ${idx + 1} description for assistance in Haiti.`,
    commune: communes[idx % communes.length],
    lat: 18.5 + Math.random(),
    lng: -72.3 + Math.random(),
    contactName: `Contact ${idx + 1}`,
    contactPhone: `+509555${(1000 + idx).toString().padStart(4, '0')}`,
    contactEmail: `contact${idx + 1}@example.com`,
    status: statuses[idx % statuses.length],
    publicHash: `pub_${idx}_${Date.now()}`,
    source: idx % 5 === 0 ? Source.WHATSAPP : Source.WEB,
  }));

  for (const data of requests) {
    await prisma.request.create({ data });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
