import { describe, it, expect } from 'vitest';
import { requestSchema } from '../src/lib/schemas';

describe('requestSchema', () => {
  it('validates a correct payload', () => {
    const result = requestSchema.safeParse({
      type: 'FOOD',
      description: 'Need assistance with food and water for 20 people.',
      commune: 'Port-au-Prince',
      lat: '18.5',
      lng: '-72.3',
      contactName: 'Test',
      contactPhone: '+50912345678',
      contactEmail: 'test@example.com',
      consent: 'on'
    });
    expect(result.success).toBe(true);
  });

  it('fails without consent', () => {
    const result = requestSchema.safeParse({
      type: 'FOOD',
      description: 'Need assistance.',
      commune: 'Port-au-Prince',
      contactName: 'Test',
      contactPhone: '+50912345678',
      consent: 'off'
    } as any);
    expect(result.success).toBe(false);
  });
});
