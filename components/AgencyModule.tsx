
import React, { useState } from 'react';
import { Agency } from '../types';
import PracticeMode from './PracticeMode';
import LearningResources from './LearningResources';

type Tab = 'practice' | 'resources';

const BookOpenIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 mr-2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
);
const Edit3Icon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 mr-2"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
);


const AgencyModule: React.FC<{ agency: Agency, onBack: () => void }> = ({ agency, onBack }) => {
  const [activeTab, setActiveTab] = useState<Tab>('practice');

  const TabButton: React.FC<{ tabId: Tab; currentTab: Tab; children: React.ReactNode; onClick: () => void; }> = ({ tabId, currentTab, children, onClick }) => {
    const isActive = tabId === currentTab;
    const activeClasses = `text-white bg-${agency.themeColor}-600`;
    const inactiveClasses = 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700';
    return (
      <button 
        onClick={onClick}
        className={`flex items-center justify-center px-4 py-2 font-semibold rounded-md transition-colors ${isActive ? activeClasses : inactiveClasses}`}
      >
        {children}
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900/50">
      <header className="bg-white dark:bg-gray-800 shadow-sm p-4 sticky top-0 z-10">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <button onClick={onBack} className="text-gray-500 hover:text-gray-800 dark:hover:text-white mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div className="flex items-center space-x-3">
               <span className="text-3xl">{agency.logo}</span>
               <div>
                <h1 className="text-xl font-bold text-gray-800 dark:text-white">{agency.name}</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">{agency.fullName}</p>
               </div>
            </div>
          </div>
          <div className="flex space-x-2 bg-gray-100 dark:bg-gray-900 p-1 rounded-lg">
            <TabButton tabId="practice" currentTab={activeTab} onClick={() => setActiveTab('practice')}>
              <Edit3Icon /> Practice
            </TabButton>
            <TabButton tabId="resources" currentTab={activeTab} onClick={() => setActiveTab('resources')}>
              <BookOpenIcon /> Resources
            </TabButton>
          </div>
        </div>
      </header>
      
      <main>
        {activeTab === 'practice' && <PracticeMode questions={agency.questionBank} agencyColor={agency.themeColor} />}
        {activeTab === 'resources' && <LearningResources agency={agency} />}
      </main>
    </div>
  );
};

export default AgencyModule;
