
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useFormContext } from 'react-hook-form';
import { FormValues } from './formSchema';

const MessageField = () => {
  const form = useFormContext<FormValues>();

  return (
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
  );
};

export default MessageField;
