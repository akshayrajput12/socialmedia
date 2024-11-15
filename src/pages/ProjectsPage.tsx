import React from 'react';
import { ProjectGrid } from '../components/projects/ProjectGrid';
import { Plus } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const ProjectsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Projects</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Discover and collaborate on student projects
          </p>
        </div>
        <Button className="flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>New Project</span>
        </Button>
      </div>

      <ProjectGrid />
    </div>
  );
};