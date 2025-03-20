
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { useFormContext } from 'react-hook-form';
import { FormValues } from './formSchema';

const PositionField = () => {
  const form = useFormContext<FormValues>();

  return (
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
  );
};

export default PositionField;
