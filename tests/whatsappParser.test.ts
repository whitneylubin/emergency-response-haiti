import { describe, expect, it } from 'vitest';
import { parseWhatsAppMessage } from '../src/lib/whatsappParser';

describe('parseWhatsAppMessage', () => {
  it('detects food request in Kreyòl', () => {
    const parsed = parseWhatsAppMessage({ from: '+5091111', body: 'Mwen bezwen manje nan Port-au-Prince vit' });
    expect(parsed.type).toBe('FOOD');
    expect(parsed.commune).toContain('Port');
    expect(parsed.language).toBe('ht');
  });

  it('defaults to other', () => {
    const parsed = parseWhatsAppMessage({ from: '+509', body: 'Need help unknown location' });
    expect(parsed.type).toBe('OTHER');
    expect(parsed.commune).toBe('');
    expect(parsed.language).toBe('en');
  });
});
