
import React, { useState } from 'react';
import AgencySelectionDashboard from './components/AgencySelectionDashboard';
import AgencyModule from './components/AgencyModule';
import Modal from './components/common/Modal';
import Button from './components/common/Button';
import { Agency } from './types';
import { AGENCIES } from './constants';

const App: React.FC = () => {
  const [agencies, setAgencies] = useState<Agency[]>(AGENCIES);
  const [selectedAgency, setSelectedAgency] = useState<Agency | null>(null);
  const [unlockModalAgency, setUnlockModalAgency] = useState<Agency | null>(null);
  
  const handleSelectAgency = (agency: Agency) => {
    if (agency.isLocked) {
      setUnlockModalAgency(agency);
    } else {
      setSelectedAgency(agency);
    }
  };

  const handleUnlockAgency = () => {
    if (unlockModalAgency) {
      const updatedAgencies = agencies.map(a => 
        a.id === unlockModalAgency.id ? { ...a, isLocked: false } : a
      );
      setAgencies(updatedAgencies);
      const newlyUnlockedAgency = updatedAgencies.find(a => a.id === unlockModalAgency.id);
      if (newlyUnlockedAgency) {
          setSelectedAgency(newlyUnlockedAgency);
      }
      setUnlockModalAgency(null);
    }
  };

  const handleBackToDashboard = () => {
    setSelectedAgency(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {selectedAgency ? (
        <AgencyModule agency={selectedAgency} onBack={handleBackToDashboard} />
      ) : (
        <AgencySelectionDashboard agencies={agencies} onSelectAgency={handleSelectAgency} />
      )}
      
      <Modal 
        isOpen={!!unlockModalAgency}
        onClose={() => setUnlockModalAgency(null)}
        title={`Unlock ${unlockModalAgency?.name} Module`}
      >
        <div className="text-center">
            <p className="mb-6">This feature simulates unlocking a new agency module. In a real app, this would be a purchase screen.</p>
            <Button onClick={handleUnlockAgency} color={unlockModalAgency?.themeColor || 'blue'}>
                Unlock Now
            </Button>
        </div>
      </Modal>
    </div>
  );
};

export default App;
