"use client";
import AddRole from '@/components/AddRole';
import { useState, useEffect } from 'react';
import { Sun, Moon, MoreVertical } from 'lucide-react';
import AssignRole from '@/components/AssignRole';
import ShowManagers from '@/components/ShowManagers';
import SkeletonCard from '@/components/SkeletonCard';

export default function RolesPermissionsPage() {
  interface Role {
    name: string;
    portee: string;
    description: string;
  }

  const [theme, setTheme] = useState('light');
  const [Roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check saved or system preferences
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
      if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);

    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  useEffect(() => {
    const fetchRoles = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch('/api/role', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });

        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.message || 'Failed to fetch roles');
        }

        const data = await res.json();
        setRoles(data); // Update state with fetched roles
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message || 'An unexpected error occurred');
        } else {
          setError('An unexpected error occurred');
        }
      } finally {
        setLoading(false); // Disable loading state
      }
    };

    fetchRoles();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 p-4 md:p-6 overflow-y-auto ml-24">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 md:p-6 mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-xl font-semibold">Rôles & Permissions</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Examinez les rôles de vos membres et attribuez des permissions
            </p>
          </div>
          <div className="flex items-center gap-3 self-end md:self-auto">
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
              aria-label="Toggle Theme"
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium">
              Gérer les Rôles
            </button>
            <button className="p-2 rounded-md border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700">
              <MoreVertical size={18} />
            </button>
          </div>
        </div>

        {/* Cards Grid */}
        {loading && (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </div>
          )}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && Roles.length === 0 && (
          <p className="text-gray-500 dark:text-gray-400">No roles available.</p>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          
        {!loading && !error && (
  <>
    {Roles.map((role, index) => (
      <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow p-5">
        <div className="flex justify-between items-center mb-2">
          <h2 className="font-semibold text-lg">{role.name}</h2>
          <span className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full text-xs">
            Portée: {role.portee}
          </span>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
          {role.description}
        </p>
        <div className="flex flex-wrap gap-3">
          <ShowManagers role={role.name} />
          <AssignRole roleName={role.name} />
        </div>
      </div>
    ))}

    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-5 border-2 border-dashed border-gray-200 dark:border-gray-700 flex flex-col items-center justify-center cursor-pointer hover:border-indigo-300 dark:hover:border-indigo-600 h-52">
      <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
        <AddRole />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-400">Créer Nouveau Rôle</p>
    </div>
  </>
)}

          
        </div>
      </div>
    </div>
  );
}