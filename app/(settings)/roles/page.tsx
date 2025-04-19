"use client";
import AddRole from '@/components/AddRole'
import { useState, useEffect } from 'react';
import { Sun, Moon, MoreVertical, Plus } from 'lucide-react';
import AssignRole from '@/components/AssignRole'
import ShowManagers from '@/components/ShowManagers'
export default function RolesPermissionsPage() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    // Vérifie les préférences sauvegardées ou système
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

  const roles = [
    {
      title: "Admin Organisation",
      managers: 3,
      scope: "Organisation",
      description: "Accès complet pour gérer les membres, la facturation et les paramètres généraux de l'organisation.",
      addButtonText: "Ajouter Nouveau Manager"
    },
    {
      title: "Admin Développeur IT",
      managers: 2,
      scope: "Organisation",
      description: "Gère les configurations système, les intégrations et les paramètres liés à l'IT.",
      addButtonText: "Ajouter Nouvel Admin IT"
    },
    {
      title: "Admin Intégration",
      managers: 1,
      scope: "Organisation",
      description: "Gère les intégrations tierces et la connectivité des systèmes.",
      addButtonText: "Ajouter Nouvel Admin Intégration"
    },
    {
      title: "Admin Comptabilité",
      managers: 2,
      scope: "Équipe",
      description: "Gère les opérations financières, la facturation et le suivi des dépenses.",
      addButtonText: "Ajouter Nouvel Admin Comptabilité"
    },
    {
      title: "Admin Équipe",
      managers: 2,
      scope: "Équipe",
      description: "Supervise les activités de l'équipe, les permissions et les opérations internes.",
      addButtonText: "Ajouter Nouvel Admin Équipe"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 p-4 md:p-6 overflow-y-auto ml-24">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 md:p-6 mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-xl font-semibold">Rôles & Permissions</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Examinez les rôles de vos membres et attribuez des permissions</p>
          </div>
          <div className="flex items-center gap-3 self-end md:self-auto">
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Role Cards */}
          {roles.map((role, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow p-5">
              <div className="flex justify-between items-center mb-2">
                <h2 className="font-semibold text-lg">{role.title}</h2>
                <span className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full text-xs">
                  {role.managers} Manager{role.managers > 1 ? 's' : ''}
                </span>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                Portée: {role.scope}
              </p>
              <p className="text-sm mb-5">{role.description}</p>
              <div className="flex flex-wrap gap-3">
                
               <ShowManagers/>
                <AssignRole/>
              </div>
            </div>
          ))}

          {/* Create New Role Card */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-5 border-2 border-dashed border-gray-200 dark:border-gray-700 flex flex-col items-center justify-center cursor-pointer hover:border-indigo-300 dark:hover:border-indigo-600 h-52">
            <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
              <AddRole/>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Créer Nouveau Rôle</p>
          </div>
        </div>
      </div>
    </div>
  );
}