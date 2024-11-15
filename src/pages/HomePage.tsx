import React from 'react';
import { useAuthStore } from '../lib/store';

export const HomePage: React.FC = () => {
  const user = useAuthStore((state) => state.user);

  return (
    <div className="space-y-8">
      <section className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user?.name}!</h1>
        <p className="mt-2 text-gray-600">
          Stay connected with your university community and discover new opportunities.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <QuickAccessCard
          title="Your Projects"
          description="View and manage your ongoing projects"
          link="/projects"
        />
        <QuickAccessCard
          title="Messages"
          description="Check your conversations and connect with peers"
          link="/messages"
        />
        <QuickAccessCard
          title="Profile"
          description="Update your information and preferences"
          link="/profile"
        />
      </div>
    </div>
  );
};

const QuickAccessCard: React.FC<{
  title: string;
  description: string;
  link: string;
}> = ({ title, description, link }) => (
  <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
    <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
    <p className="mt-2 text-gray-600">{description}</p>
    <a
      href={link}
      className="mt-4 inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-500"
    >
      Learn more <span aria-hidden="true">&rarr;</span>
    </a>
  </div>
);