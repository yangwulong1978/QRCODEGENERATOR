import { z } from 'zod';

export const qrFormSchema = z.object({
  CompanyName: z.string().min(1, 'Company Name is required'),
  TemporaryToken: z.string().min(1, 'Temporary Token is required'),
  BASEAPIURL: z.string().url('Must be a valid URL').min(1, 'Base API URL is required'),
});

export type QRFormSchema = z.infer<typeof qrFormSchema>;
