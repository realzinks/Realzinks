
import React from 'react';
import { Agency, Subject, AgencyId } from './types';

const FlagIcon = () => <span className="text-2xl">🇳🇬</span>;
const BuildingIcon = () => <span className="text-2xl">🏛️</span>;
const PassportIcon = () => <span className="text-2xl">🛂</span>;
const FireIcon = () => <span className="text-2xl">🔥</span>;


export const AGENCIES: Agency[] = [
  {
    id: AgencyId.NSCDC,
    name: 'NSCDC',
    fullName: 'Nigeria Security and Civil Defence Corps',
    themeColor: 'blue',
    logo: <FlagIcon />,
    isLocked: false,
    questionBank: [
      { id: 1, text: "What year was the NSCDC officially established as a full-fledged paramilitary agency?", options: ["2003", "1967", "2007", "1999"], correctAnswerIndex: 0, subject: Subject.AGENCY_KNOWLEDGE },
      { id: 2, text: "Which of the following is NOT a core mandate of the NSCDC?", options: ["Protecting critical national assets", "Disaster management", "Prosecuting criminal offenders", "Training private security companies"], correctAnswerIndex: 2, subject: Subject.AGENCY_KNOWLEDGE },
      { id: 3, text: "Choose the word that is opposite in meaning to 'Transient'.", options: ["Fleeting", "Permanent", "Temporary", "Short-lived"], correctAnswerIndex: 1, subject: Subject.ENGLISH },
      { id: 4, text: "If a car travels at 60 km/h, how far will it travel in 2.5 hours?", options: ["120 km", "150 km", "180 km", "100 km"], correctAnswerIndex: 1, subject: Subject.MATH },
      { id: 5, text: "Who is the current President of Nigeria?", options: ["Goodluck Jonathan", "Muhammadu Buhari", "Olusegun Obasanjo", "Bola Ahmed Tinubu"], correctAnswerIndex: 3, subject: Subject.CURRENT_AFFAIRS },
      { id: 6, text: "All birds can fly. A penguin is a bird. Therefore, a penguin can fly. What is wrong with this reasoning?", options: ["The first premise is false", "The conclusion is true", "It is a valid argument", "The second premise is false"], correctAnswerIndex: 0, subject: Subject.LOGICAL_REASONING },
    ],
    resources: [
        { title: 'NSCDC Act', content: 'The NSCDC Act of 2003, amended in 2007, outlines the corps\' powers and responsibilities.' },
        { title: 'Interview Tips', content: 'Be confident, research the agency thoroughly, and dress professionally.' }
    ]
  },
  {
    id: AgencyId.NCOS,
    name: 'NCoS',
    fullName: 'Nigerian Correctional Service',
    themeColor: 'green',
    logo: <BuildingIcon />,
    isLocked: true,
    questionBank: [],
    resources: []
  },
  {
    id: AgencyId.NIS,
    name: 'NIS',
    fullName: 'Nigerian Immigration Service',
    themeColor: 'indigo',
    logo: <PassportIcon />,
    isLocked: true,
    questionBank: [],
    resources: []
  },
  {
    id: AgencyId.FFS,
    name: 'FFS',
    fullName: 'Federal Fire Service',
    themeColor: 'red',
    logo: <FireIcon />,
    isLocked: true,
    questionBank: [],
    resources: []
  }
];
