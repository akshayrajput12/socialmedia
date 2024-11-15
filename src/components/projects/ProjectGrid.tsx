import React, { useState } from 'react';
import { ProjectCard } from './ProjectCard';
import { Search, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const categories = ['All', 'Research', 'Development', 'Design', 'Business'];

export const ProjectGrid: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Sample projects data
  const projects = [
    {
      id: '1',
      title: 'AI Research Assistant',
      description: 'Developing an AI-powered research assistant for academic papers and literature review automation.',
      thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800',
      category: 'Research',
      collaborators: 4,
      deadline: '2024-05-15',
      tags: ['AI', 'Machine Learning', 'Research'],
    },
    {
      id: '2',
      title: 'Sustainable Campus App',
      description: 'Mobile application to track and reduce carbon footprint across university campuses.',
      thumbnail: 'https://images.unsplash.com/photo-1472289065668-ce650ac443d2?auto=format&fit=crop&w=800',
      category: 'Development',
      collaborators: 3,
      deadline: '2024-06-30',
      tags: ['Mobile', 'Sustainability', 'React Native'],
    },
    {
      id: '3',
      title: 'Student Marketplace UI',
      description: 'Designing a modern marketplace interface for students to buy and sell academic materials.',
      thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800',
      category: 'Design',
      collaborators: 2,
      deadline: '2024-04-20',
      tags: ['UI/UX', 'Figma', 'Design System'],
    },
    {
      id: '4',
      title: 'Campus Food Delivery',
      description: 'Business plan for an on-campus food delivery service targeting students and faculty.',
      thumbnail: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=800',
      category: 'Business',
      collaborators: 5,
      deadline: '2024-07-10',
      tags: ['Startup', 'Food Service', 'Business Plan'],
    },
    {
      id: '5',
      title: 'Smart Study Groups',
      description: 'Platform for automatically matching students with study partners based on courses and schedules.',
      thumbnail: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800',
      category: 'Development',
      collaborators: 3,
      deadline: '2024-05-30',
      tags: ['Web App', 'AI', 'Education'],
    },
    {
      id: '6',
      title: 'Research Data Visualization',
      description: 'Interactive visualization tools for complex research data in scientific papers.',
      thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800',
      category: 'Research',
      collaborators: 2,
      deadline: '2024-06-15',
      tags: ['Data Viz', 'D3.js', 'Research'],
    }
  ];

  const filteredProjects = projects.filter((project) => {
    const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          />
        </div>
        
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">No projects found matching your criteria</p>
        </div>
      )}
    </div>
  );
};