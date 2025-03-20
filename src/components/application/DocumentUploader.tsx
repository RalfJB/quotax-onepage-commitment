
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import { Upload, X, PaperclipIcon } from 'lucide-react';
import { useFormContext } from 'react-hook-form';
import { FormValues, FileWithPreview } from './formSchema';

interface DocumentUploaderProps {
  uploadedFiles: FileWithPreview[];
  setUploadedFiles: React.Dispatch<React.SetStateAction<FileWithPreview[]>>;
}

const DocumentUploader = ({ uploadedFiles, setUploadedFiles }: DocumentUploaderProps) => {
  const form = useFormContext<FormValues>();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newFiles = Array.from(files).map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      }));
      
      setUploadedFiles(prev => [...prev, ...newFiles]);
      form.setValue('documents', [...uploadedFiles, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    const updatedFiles = [...uploadedFiles];
    
    // Release the URL object to avoid memory leaks
    if (updatedFiles[index].preview) {
      URL.revokeObjectURL(updatedFiles[index].preview!);
    }
    
    updatedFiles.splice(index, 1);
    setUploadedFiles(updatedFiles);
    form.setValue('documents', updatedFiles);
  };

  return (
    <FormField
      control={form.control}
      name="documents"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-white">Unterlagen hochladen</FormLabel>
          <FormControl>
            <div className="space-y-4">
              <label className="flex items-center justify-center w-full h-12 px-4 py-2 border border-dashed border-gray-500 bg-gray-700/50 rounded-md cursor-pointer hover:bg-gray-600/50 transition-colors">
                <div className="flex items-center space-x-2 text-gray-300">
                  <Upload size={18} />
                  <span>Dokumente hinzufügen (Anschreiben, Lebenslauf, Zeugnisse)</span>
                </div>
                <input
                  type="file"
                  className="hidden"
                  accept=".pdf,.doc,.docx"
                  multiple
                  onChange={handleFileChange}
                />
              </label>
              
              {uploadedFiles.length > 0 && (
                <div className="space-y-2 mt-3">
                  {uploadedFiles.map((file, index) => (
                    <div 
                      key={index} 
                      className="flex items-center justify-between p-2 bg-gray-700 rounded border border-gray-600"
                    >
                      <div className="flex items-center space-x-2 text-white">
                        <PaperclipIcon size={16} className="text-green" />
                        <span className="text-sm truncate max-w-[200px]">{file.name}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </FormControl>
          <FormDescription className="text-gray-400 text-sm">
            Maximale Dateigröße: 5MB pro Datei
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default DocumentUploader;
