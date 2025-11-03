
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  color?: string;
  variant?: 'solid' | 'outline';
}

const Button: React.FC<ButtonProps> = ({ children, color = 'blue', variant = 'solid', className = '', ...props }) => {
  const baseClasses = 'px-6 py-2 rounded-lg font-semibold transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-900';
  
  const colorClasses = {
    solid: `bg-${color}-600 text-white hover:bg-${color}-700 focus:ring-${color}-500`,
    outline: `border-2 border-${color}-600 text-${color}-600 dark:text-${color}-400 dark:border-${color}-400 hover:bg-${color}-600 hover:text-white dark:hover:text-white`,
  };

  // Note: Tailwind's JIT compiler needs to see full class names.
  // This dynamic approach might not work perfectly without safelisting.
  // For this project, we'll manually add the color classes we need.
  const themeClasses = {
    blue: {
      solid: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
      outline: 'border-2 border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400 hover:bg-blue-600 hover:text-white dark:hover:text-white'
    },
    green: {
      solid: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500',
      outline: 'border-2 border-green-600 text-green-600 dark:text-green-400 dark:border-green-400 hover:bg-green-600 hover:text-white dark:hover:text-white'
    },
    indigo: {
        solid: 'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500',
        outline: 'border-2 border-indigo-600 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400 hover:bg-indigo-600 hover:text-white dark:hover:text-white'
    },
    red: {
      solid: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
      outline: 'border-2 border-red-600 text-red-600 dark:text-red-400 dark:border-red-400 hover:bg-red-600 hover:text-white dark:hover:text-white'
    },
    gray: {
      solid: 'bg-gray-500 text-white hover:bg-gray-600 focus:ring-gray-400',
      outline: 'border-2 border-gray-500 text-gray-500 dark:text-gray-400 dark:border-gray-400 hover:bg-gray-500 hover:text-white dark:hover:text-white'
    }
  };

  const selectedTheme = themeClasses[color as keyof typeof themeClasses] || themeClasses.blue;

  return (
    <button className={`${baseClasses} ${selectedTheme[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
