
import { z } from 'zod';

export const formSchema = z.object({
  name: z.string().min(2, { message: 'Name muss mindestens 2 Zeichen haben' }),
  email: z.string().email({ message: 'Bitte geben Sie eine gültige E-Mail-Adresse ein' }),
  phone: z.string().optional(),
  position: z.string().min(1, { message: 'Bitte wählen Sie eine Position' }),
  message: z.string().min(10, { message: 'Nachricht muss mindestens 10 Zeichen haben' }),
  documents: z.array(z.any()).optional(),
});

export type FormValues = z.infer<typeof formSchema>;
export type FileWithPreview = File & { preview?: string };
