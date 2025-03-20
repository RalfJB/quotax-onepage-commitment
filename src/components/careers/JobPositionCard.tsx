
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface JobPositionCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  skills: string[];
  onApply: () => void;
  ref?: React.Ref<HTMLDivElement>;
}

const JobPositionCard = React.forwardRef<HTMLDivElement, JobPositionCardProps>(
  ({ title, description, icon, skills, onApply }, ref) => {
    return (
      <Card 
        className="hover:shadow-lg transition-shadow border-gray-100 overflow-hidden"
        ref={ref}
      >
        <CardContent className="p-8">
          <div className="bg-gray-50 p-3 w-fit rounded-full mb-6">
            {icon}
          </div>
          <h3 className="text-2xl font-display font-semibold mb-3 text-gray-800">{title}</h3>
          <p className="text-gray-600 mb-6">{description}</p>
          
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-800 mb-3">Anforderungen:</h4>
            <div className="grid grid-cols-2 gap-2">
              {skills.map((skill, skillIndex) => (
                <div key={skillIndex} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-purple rounded-full"></div>
                  <span className="text-sm text-gray-600">{skill}</span>
                </div>
              ))}
            </div>
          </div>
          
          <Button 
            className="bg-purple hover:bg-purple-dark text-white w-full"
            onClick={onApply}
          >
            Jetzt bewerben
          </Button>
        </CardContent>
      </Card>
    );
  }
);

JobPositionCard.displayName = "JobPositionCard";

export default JobPositionCard;
