
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

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
        className="bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
        ref={ref}
      >
        <CardContent className="p-8">
          <div className="bg-[#f3e6f3] p-4 w-16 h-16 flex items-center justify-center mb-6">
            {icon}
          </div>
          <h3 className="text-2xl font-display font-semibold mb-3 text-gray-800">{title}</h3>
          <p className="text-gray-600 mb-6">{description}</p>
          
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-800 mb-3">Anforderungen:</h4>
            <div className="grid grid-cols-2 gap-2">
              {skills.map((skill, skillIndex) => (
                <div key={skillIndex} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-[#a04ca0] rounded-full"></div>
                  <span className="text-sm text-gray-600">{skill}</span>
                </div>
              ))}
            </div>
          </div>
          
          <Button 
            className="bg-[#a04ca0] hover:bg-[#864286] text-white w-full"
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
