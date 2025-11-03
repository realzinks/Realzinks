
import React from 'react';

// FIX: Extend from HTMLAttributes to allow standard div props like onClick and style.
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '', ...props }) => {
  return (
    <div {...props} className={`bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden p-6 ${className}`}>
      {children}
    </div>
  );
};

export default Card;
