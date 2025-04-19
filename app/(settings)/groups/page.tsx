"use client";
import { useState, useEffect } from "react";
import { Sun, Moon, MoreVertical, } from "lucide-react";
import Popup from '@/components/Popup'
import AddMember from '@/components/AddMember'
import AddTeam from '@/components/AddTeam'

const Groups = () => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    // Vérifie les préférences sauvegardées ou système
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
      if (savedTheme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);

    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const groups = [
    {
      title: "Développement IT",
      members: 10,
      scope: "Organisation",
      description:
        "Groupe responsable du développement et de la maintenance des systèmes informatiques.",
      addButtonText: "Ajouter Nouveau Membre",
    },
    {
      title: "Marketing",
      members: 8,
      scope: "Organisation",
      description:
        "Groupe chargé des campagnes marketing et de la communication.",
      addButtonText: "Ajouter Nouveau Membre",
    },
    {
      title: "Comptabilité",
      members: 5,
      scope: "Équipe",
      description:
        "Groupe en charge des finances, de la facturation et des rapports financiers.",
      addButtonText: "Ajouter Nouveau Membre",
    },
    {
      title: "Support Client",
      members: 12,
      scope: "Équipe",
      description:
        "Groupe dédié à l'assistance des clients et à la gestion des tickets de support.",
      addButtonText: "Ajouter Nouveau Membre",
    },
    {
      title: "Ressources Humaines",
      members: 6,
      scope: "Organisation",
      description:
        "Groupe responsable de la gestion des employés et des processus RH.",
      addButtonText: "Ajouter Nouveau Membre",
    },
  ];

  const team = [
    {
      id: "1",
      name: "amine",
      email: "amine@gmail.com"
    },
    {
      id: "2",
      name: "soufiane",
      email: "soufiane@gmail.com"
    },
    {
      id: "3",
      name: "admin",
      email: "admin@gmail.com"
    },
    {
      id: "4",
      name: "sarah",
      email: "sarah@gmail.com"
    },
    {
      id: "5",
      name: "mohamed",
      email: "mohamed@gmail.com"
    }
  ];

  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 p-4 md:p-6 overflow-y-auto ml-24">
      <div className="max-w-7xl mx-auto ">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 md:p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-xl font-semibold">Groups</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Examinez les Groupes et ajouter de nouveau membres
            </p>
          </div>

          <div className="flex items-center gap-3 self-end md:self-auto ">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
            </button>

            <button className="p-2 rounded-md border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700">
              <MoreVertical size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2">
        <form className="grid grid-cols-1 gap-4 mt-3 max-w-7xl mx-auto">
          {groups.map((group) => (
            <div className="" key={group.title}>
              <div className="flex justify-start p-4 gap-4 bg-white dark:bg-gray-800 dark:text-white text-gray-800 shadow-lg rounded-md">
                <div className="w-12 h-12 rounded-full dark:bg-white bg-gray-800 flex items-center justify-center"></div>
                <div className="p-2 flex-1 relative">
                  <div>
                    <div className="flex gap-2 items-center">
                      <p className="font-semibold text-gray-800 text-xl dark:text-gray-200">
                        {group.title}
                      </p>
                      <span className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full flex items-center h-fit text-xs">
                        {group.members} members
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {group.description}
                    </p>
                  </div>
                  <div className="flex justify-end items-end gap-3 mt-3 ">
                    {/* <button type="button" className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium cursor-pointer">
                      Add member
                    </button> */}
                    <AddMember GroupName={group.title}/>
                  </div>
                  <div className="absolute top-0 right-0 ">
                    <Popup title={"delete"} icon={<MoreVertical />} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </form>

        <div className="hidden sm:inline md:block p-3">
        <AddTeam/>
        </div>
      </div>
    </div>
  );
};

export default Groups;