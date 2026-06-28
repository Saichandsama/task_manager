import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Circle, Clock, LayoutList } from 'lucide-react';
import { useTasks } from '../hooks/useTasks';

const DashboardCards = () => {
  const { stats } = useTasks();

  const cards = [
    { title: 'Total Tasks', value: stats.total, icon: LayoutList, color: 'text-primary-500', bg: 'bg-primary-50 dark:bg-primary-900/20' },
    { title: 'Pending', value: stats.pending, icon: Circle, color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-900/20' },
    { title: 'In Progress', value: stats.inProgress, icon: Clock, color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/20' },
    { title: 'Completed', value: stats.completed, icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-900/20' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {cards.map((card, index) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center justify-between"
        >
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">{card.title}</p>
            <h3 className="text-3xl font-bold text-gray-800 dark:text-white">{card.value}</h3>
          </div>
          <div className={`p-4 rounded-full ${card.bg}`}>
            <card.icon className={`w-8 h-8 ${card.color}`} />
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default DashboardCards;
