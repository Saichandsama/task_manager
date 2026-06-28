import React from 'react';
import { useTheme } from '../hooks/useTheme';
import { Moon, Sun, CheckSquare } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-sm transition-colors duration-300">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2"
        >
          <div className="bg-primary-500 p-2 rounded-lg">
            <CheckSquare className="text-white w-6 h-6" />
          </div>
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">TaskFlow</h1>
        </motion.div>
        
        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          aria-label="Toggle Dark Mode"
        >
          {theme === 'light' ? (
            <Moon className="w-6 h-6 text-gray-600 dark:text-gray-300" />
          ) : (
            <Sun className="w-6 h-6 text-gray-600 dark:text-gray-300" />
          )}
        </motion.button>
      </div>
    </nav>
  );
};

export default Navbar;
