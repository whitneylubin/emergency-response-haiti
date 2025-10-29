import { z } from 'zod';

const optionalNumber = z
  .union([z.string(), z.number()])
  .transform((value) => {
    if (value === '' || value === undefined || value === null) return undefined;
    const parsed = Number(value);
    return Number.isNaN(parsed) ? undefined : parsed;
  });

export const requestSchema = z.object({
  type: z.enum(['FOOD', 'WATER', 'MEDICAL', 'SHELTER', 'CONNECTIVITY', 'OTHER']),
  description: z.string().min(10).max(1000),
  commune: z.string().min(2),
  lat: optionalNumber.optional(),
  lng: optionalNumber.optional(),
  contactName: z.string().min(2),
  contactPhone: z.string().min(5),
  contactEmail: z
    .union([z.string(), z.undefined()])
    .transform((value) => {
      if (!value) return undefined;
      return value;
    })
    .refine((value) => !value || /.+@.+/.test(value), 'Invalid email'),
  consent: z.literal('on'),
});

export type RequestSchema = z.infer<typeof requestSchema>;
