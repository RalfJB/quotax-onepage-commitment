
import React from 'react';
import { Button } from '@/components/ui/button';
import { SendHorizonal } from 'lucide-react';

interface SubmitButtonProps {
  isSubmitting: boolean;
}

const SubmitButton = ({ isSubmitting }: SubmitButtonProps) => {
  return (
    <Button 
      type="submit" 
      className="w-full bg-green hover:bg-green-dark text-white font-medium transition-all duration-300 flex items-center justify-center gap-2 h-12"
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
  );
};

export default SubmitButton;
