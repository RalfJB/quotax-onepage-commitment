
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { formSchema, FormValues, FileWithPreview } from './application/formSchema';
import PersonalInfoFields from './application/PersonalInfoFields';
import PositionField from './application/PositionField';
import MessageField from './application/MessageField';
import DocumentUploader from './application/DocumentUploader';
import SubmitButton from './application/SubmitButton';

interface ApplicationFormProps {
  position?: string;
}

const ApplicationForm = ({ position }: ApplicationFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<FileWithPreview[]>([]);
  const { toast } = useToast();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      position: position || '',
      message: '',
      documents: [],
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    // Simulate API call
    try {
      // In a real implementation, you would send the data to a server
      console.log('Sending application to office@quotax.de', { ...data, files: uploadedFiles });
      
      // Simulate a delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Bewerbung gesendet!",
        description: "Wir werden uns in Kürze bei Ihnen melden.",
        variant: "default",
      });
      
      form.reset();
      setUploadedFiles([]);
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

  return (
    <div className="bg-gray-800 rounded-xl shadow-lg p-8">
      <h3 className="text-2xl font-display font-semibold mb-6 text-white">Jetzt bewerben</h3>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <PersonalInfoFields />
          <PositionField />
          <MessageField />
          <DocumentUploader 
            uploadedFiles={uploadedFiles} 
            setUploadedFiles={setUploadedFiles} 
          />
          <SubmitButton isSubmitting={isSubmitting} />
        </form>
      </Form>
    </div>
  );
};

export default ApplicationForm;
