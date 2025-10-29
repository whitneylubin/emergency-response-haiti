import { RequestType } from '@prisma/client';

const TYPE_KEYWORDS: Record<RequestType, string[]> = {
  FOOD: ['manje', 'nourriture', 'food'],
  WATER: ['dlo', 'eau', 'water'],
  MEDICAL: ['medikal', 'médical', 'medical', 'medikaman'],
  SHELTER: ['abri', 'shelter', 'lodging'],
  CONNECTIVITY: ['konekte', 'connectivité', 'connectivity', 'reseau'],
  OTHER: ['lot', 'lòt', 'autre', 'other']
};

const LANGUAGE_ACK = {
  ht: 'Mèsi. Nou resevwa mesaj ou.',
  fr: 'Merci. Votre message a été reçu.',
  en: 'Thank you. We received your message.'
};

export interface WhatsAppPayload {
  from: string;
  body: string;
  mediaUrl?: string;
}

export interface ParsedWhatsApp {
  type: RequestType;
  commune: string;
  description: string;
  language: 'ht' | 'fr' | 'en';
}

export function parseWhatsAppMessage(payload: WhatsAppPayload): ParsedWhatsApp {
  const text = payload.body.toLowerCase();
  const language = detectLanguage(text);
  const type = detectType(text);
  const commune = detectCommune(text);
  const description = payload.body.trim();
  return { type, commune, description, language };
}

function detectLanguage(text: string): 'ht' | 'fr' | 'en' {
  if (/(mèsi|kijan|tanpri|sivouplè)/.test(text)) return 'ht';
  if (/(merci|bonjour|besoin)/.test(text)) return 'fr';
  return 'en';
}

function detectType(text: string): RequestType {
  for (const [type, keywords] of Object.entries(TYPE_KEYWORDS) as [RequestType, string[]][]) {
    if (keywords.some((word) => text.includes(word))) {
      return type;
    }
  }
  return RequestType.OTHER;
}

const COMMUNES = [
  'port-au-prince',
  'cap-haïtien',
  'les cayes',
  'jérémie',
  'jacmel',
  'gonaïves',
  'hinche',
  'fort-liberté',
  'miragoâne',
  'petit-goâve'
];

function detectCommune(text: string): string {
  const normalized = text
    .normalize('NFD')
    .replace(/[^\p{L}\p{N}\s-]/gu, '')
    .toLowerCase();
  const match = COMMUNES.find((c) => normalized.includes(c));
  return match ? capitalize(match) : '';
}

function capitalize(value: string) {
  return value
    .split(' ')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

export function getAcknowledgement(language: 'ht' | 'fr' | 'en') {
  return LANGUAGE_ACK[language];
}
