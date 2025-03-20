
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useFormContext } from 'react-hook-form';
import { FormValues } from './formSchema';

const PersonalInfoFields = () => {
  const form = useFormContext<FormValues>();

  return (
    <>
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
    </>
  );
};

export default PersonalInfoFields;
