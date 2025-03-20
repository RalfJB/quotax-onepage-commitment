
import { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SendHorizonal, Check, Upload, PaperclipIcon } from 'lucide-react';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name muss mindestens 2 Zeichen haben' }),
  email: z.string().email({ message: 'Bitte geben Sie eine gültige E-Mail-Adresse ein' }),
  phone: z.string().optional(),
  position: z.string().min(1, { message: 'Bitte wählen Sie eine Position' }),
  message: z.string().min(10, { message: 'Nachricht muss mindestens 10 Zeichen haben' }),
  resume: z.any().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface ApplicationFormProps {
  position?: string;
}

const ApplicationForm = ({ position }: ApplicationFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fileName, setFileName] = useState('');
  const { toast } = useToast();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      position: position || '',
      message: '',
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    // Simulate API call
    try {
      // In a real implementation, you would send the data to a server
      console.log('Sending application to office@quotax.de', data);
      
      // Simulate a delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Bewerbung gesendet!",
        description: "Wir werden uns in Kürze bei Ihnen melden.",
        variant: "default",
      });
      
      form.reset();
      setFileName('');
    } catch (error) {
      toast({
        title: "Fehler beim Senden",
        description: "Bitte versuchen Sie es später erneut oder kontaktieren Sie uns direkt.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      form.setValue('resume', file);
    }
  };

  return (
    <div className="bg-gray-800 rounded-xl shadow-lg p-8">
      <h3 className="text-2xl font-display font-semibold mb-6 text-white">Jetzt bewerben</h3>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Name</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Ihr vollständiger Name" 
                    {...field} 
                    className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">E-Mail</FormLabel>
                  <FormControl>
                    <Input 
                      type="email" 
                      placeholder="ihre@email.de" 
                      {...field} 
                      className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Telefon (optional)</FormLabel>
                  <FormControl>
                    <Input 
                      type="tel" 
                      placeholder="Ihre Telefonnummer" 
                      {...field} 
                      className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="position"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Position</FormLabel>
                <FormControl>
                  <select 
                    {...field}
                    className="flex h-10 w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-sm text-white ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="" disabled>Position auswählen</option>
                    <option value="Steuerberater/in">Steuerberater/in</option>
                    <option value="Steuerfachangestellte/r">Steuerfachangestellte/r</option>
                    <option value="AI-Talent / Entwickler/in">AI-Talent / Entwickler/in</option>
                    <option value="Werkstudent/in">Werkstudent/in</option>
                    <option value="Sonstiges">Sonstiges</option>
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Ihre Nachricht</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Erzählen Sie uns etwas über sich und Ihre Motivation" 
                    {...field} 
                    rows={5}
                    className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 min-h-[120px]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="resume"
            render={({ field: { value, onChange, ...field } }) => (
              <FormItem>
                <FormLabel className="text-white">Lebenslauf (optional)</FormLabel>
                <FormControl>
                  <div className="flex items-center">
                    <label className="flex-1">
                      <div className="flex items-center justify-center w-full h-10 px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md cursor-pointer hover:bg-gray-600 transition-colors">
                        <Upload size={18} className="mr-2" />
                        {fileName ? fileName : "Datei auswählen (PDF, DOCX)"}
                      </div>
                      <input
                        type="file"
                        className="hidden"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                        {...field}
                      />
                    </label>
                  </div>
                </FormControl>
                <FormDescription className="text-gray-400 text-sm">
                  Maximale Dateigröße: 5MB
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button 
            type="submit" 
            className="w-full bg-purple hover:bg-purple-dark text-white font-medium transition-all duration-300 flex items-center justify-center gap-2 h-12"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>Wird gesendet...</>
            ) : (
              <>
                Bewerbung senden
                <SendHorizonal size={18} />
              </>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ApplicationForm;
