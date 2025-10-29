import { NextResponse } from 'next/server';

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

export async function GET() {
  return NextResponse.json(communes);
}
