
import React from 'react';
import { Agency } from '../types';
import Card from './common/Card';

interface LearningResourcesProps {
  agency: Agency;
}

const LearningResources: React.FC<LearningResourcesProps> = ({ agency }) => {
  return (
    <div className="p-4 md:p-6 space-y-6">
       <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Learning Resources</h2>
       <p className="text-gray-600 dark:text-gray-400">
         Study guides, key information, and tips for the {agency.name} recruitment process.
       </p>
       {agency.resources.map((resource, index) => (
         <Card key={index} className="border-l-4" style={{borderColor: agency.themeColor}}>
           <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">{resource.title}</h3>
           <p className="text-gray-700 dark:text-gray-300">{resource.content}</p>
         </Card>
       ))}
       {agency.resources.length === 0 && (
        <Card>
            <p className="text-center text-gray-500 dark:text-gray-400">No resources available for this agency yet.</p>
        </Card>
       )}
    </div>
  );
};

export default LearningResources;
