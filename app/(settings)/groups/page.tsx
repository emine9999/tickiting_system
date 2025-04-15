"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Sun, Moon, MoreVertical, Plus, Search } from "lucide-react";
import Popup from '@/components/Popup'
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
       name : "amine",
    email :"amine@gmail.com"
 },
 {
    name : "soufiane",
 email :"soufiane@gmail.com"
},
{
    name : "admin",
 email :"admin@gmail.com"
},

 
  ]

  const [name,setName] =  useState("")

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
        <form className="grid grid-cols-1  gap-4 mt-3 max-w-7xl mx-auto">
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
                    <span className="bg-gray-100 dark:bg-gray-700 px-3 py-1  rounded-full flex items-center h-fit text-xs">
                      {group.members} members
                    </span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {group.description}
                    </p>
                  </div>
                  <div className="flex justify-end items-end gap-3 mt-3 ">
                    
                    <button className=" bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium cursor-pointer">
                      Add member
                    </button>
                  </div>
                  <button className="absolute top-0 right-0 ">
                     <Popup title={"delete"} icon={<MoreVertical/>}/>
                  </button> 
                 
                </div>
              </div>
            </div>
          ))}
        </form>

        <div className="hidden sm:inline  md:block p-3">
          <form className="p-3  rounded-lg shadow-lg">
            <div className="flex justify-center items-center h-full">
              <Image
                src="/data/glx.jpg"
                alt="Ads"
                width={100}
                height={100}
                className="rounded-full w-18 h-18 mr-3"
              />
              <div className="flex flex-col justify-start items-center flex-1">
                <p className="w-full text-gray-800 dark:text-gray-200 text-xl font-semibold">
                  Create a new team
                </p>
                <p className="w-full text-gray-800 dark:text-gray-400 text-sm">
                  You can add any content here.
                </p>
              </div>
            </div>
            <h1 className="text-gray-800 dark:text-gray-300 text-lg font-semibold my-3 ">
              Team name
            </h1>
            <input
              className="border rounded-lg w-full p-1 hover:border-2 hover:border-indigo-500 outline-none px-2 shadow-sm"
              placeholder="SIR "
            ></input>
            <h1 className="text-gray-800 dark:text-gray-300 text-lg font-semibold my-3 ">
              members
            </h1>
            <div className="relative">
              <input
                className="border rounded-lg w-full p-1 hover:border-2 hover:border-indigo-500 px-9 outline-none dark:bg-gray-600 shadow-sm"
                placeholder="Add members by name or email "
              ></input>
              <Search
                className="absolute top-2 left-3 "
                size={19}
                color="#F1EFEC"
              />
            </div>
            {/* team members */}

            <div className="mt-4">
                {team.map((team)=>(
                    <div key={team.name} className="w-full flex items-center justify-start relative p-1 m-2  rounded-lg ">
                       <div className="w-12 h-12 rounded-full flex ">
                       <Image
                        src='/data/glx.jpg'
                        width={200}
                        height={200}
                        alt="team member"
                        className="rounded-full"
                        />
                       </div>
                       <div className="px-2">
                       <h1 className="text-gray-500">{team.name}</h1>
                       <p>{team.email}</p>
                       </div>
                       <div className="absolute top-5 right-2" >
                       <Popup  title={"add member"} icon={<Plus/>}/>
                       </div>
                        
                    </div>
                ))}
            </div>
            <hr/>
            <div className="flex justify-end mt-3">
                <button className="px-3 py-2 bg-indigo-600 rounded-lg shadow-sm text-white hover:bg-indigo-700 font-semibold cursor-pointer">Create Team</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Groups;
