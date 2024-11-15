import React, { useState } from 'react';
import { Search, Filter, MapPin, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface User {
  id: string;
  name: string;
  avatar: string;
  university: string;
  major: string;
  year: string;
}

export const UserSearch: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    university: '',
    major: '',
    year: '',
  });

  // Sample users data
  const users: User[] = [
    {
      id: '1',
      name: 'Alice Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
      university: 'Stanford University',
      major: 'Computer Science',
      year: '3rd Year',
    },
    // Add more sample users...
  ];

  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.university.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilters = (!filters.university || user.university === filters.university) &&
                          (!filters.major || user.major === filters.major) &&
                          (!filters.year || user.year === filters.year);
    return matchesSearch && matchesFilters;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search users by name or university..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <AnimatePresence>
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredUsers.map((user) => (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold text-gray-900">{user.name}</h3>
                  <div className="flex items-center text-gray-500 text-sm mt-1">
                    <MapPin className="w-4 h-4 mr-1" />
                    {user.university}
                  </div>
                  <div className="flex items-center text-gray-500 text-sm mt-1">
                    <BookOpen className="w-4 h-4 mr-1" />
                    {user.major} • {user.year}
                  </div>
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <button className="text-blue-600 hover:text-blue-500 text-sm font-medium">
                  View Profile
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};