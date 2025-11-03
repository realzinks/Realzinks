
import React from 'react';
import { Agency } from '../types';
import Card from './common/Card';

interface AgencySelectionDashboardProps {
  agencies: Agency[];
  onSelectAgency: (agency: Agency) => void;
}

const LockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-yellow-500">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
  </svg>
);


const AgencyCard: React.FC<{ agency: Agency; onSelect: () => void; }> = ({ agency, onSelect }) => {
  const borderColor = `border-${agency.themeColor}-500`;
  const hoverBgColor = `hover:bg-${agency.themeColor}-500/10`;

  // Manual mapping for Tailwind JIT
  const borderThemes: { [key: string]: string } = {
    blue: 'border-blue-500',
    green: 'border-green-500',
    indigo: 'border-indigo-500',
    red: 'border-red-500',
  };
  const hoverThemes: { [key: string]: string } = {
    blue: 'hover:bg-blue-500/10',
    green: 'hover:bg-green-500/10',
    indigo: 'hover:bg-indigo-500/10',
    red: 'hover:bg-red-500/10',
  };
  
  return (
    <Card 
      className={`border-t-4 ${borderThemes[agency.themeColor]} ${hoverThemes[agency.themeColor]} transition-all duration-300 cursor-pointer transform hover:-translate-y-1`}
      onClick={onSelect}
    >
      <div className="flex flex-col items-center text-center">
        <div className="text-4xl mb-4">{agency.logo}</div>
        <h3 className="text-2xl font-bold text-gray-800 dark:text-white">{agency.name}</h3>
        <p className="text-gray-500 dark:text-gray-400 mt-1">{agency.fullName}</p>
        {agency.isLocked && (
          <div className="mt-4 flex items-center space-x-2 bg-yellow-400/10 text-yellow-600 dark:text-yellow-400 px-3 py-1 rounded-full text-sm font-semibold">
            <LockIcon />
            <span>Module Locked</span>
          </div>
        )}
      </div>
    </Card>
  );
};


const AgencySelectionDashboard: React.FC<AgencySelectionDashboardProps> = ({ agencies, onSelectAgency }) => {
  return (
    <div className="container mx-auto p-4 md:p-8">
      <header className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 dark:text-white">CDCFIB Exam Prep</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">Choose your target agency to begin preparation.</p>
      </header>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {agencies.map(agency => (
          <AgencyCard key={agency.id} agency={agency} onSelect={() => onSelectAgency(agency)} />
        ))}
      </div>
    </div>
  );
};

export default AgencySelectionDashboard;
