"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Sun, Moon, MoreVertical, Plus, Search, X } from "lucide-react";
import Popup from '@/components/Popup'
import Alert from '@/components/Alert';
import Spinner from '@/components/Spinner';
import { groupSchema } from "@/lib/groupSchema"

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

  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState(''); // Search input for email
  const [suggestions, setSuggestions] = useState<{ id: string; name: string; email: string }[]>([]); // Suggestions for email
  const [selectedMembers, setSelectedMembers] = useState<Array<{ id: string; name: string; email: string }>>([]);

  // Fetch emails from the database based on query
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (query.length > 1) { // Reduced to 1 character for demo purposes
        // Simulate API call by filtering the team array
        const filteredTeam = team.filter(member => 
          member.name.toLowerCase().includes(query.toLowerCase()) || 
          member.email.toLowerCase().includes(query.toLowerCase())
        ).map(member => ({
          id: member.id,
          name: member.name,
          email: member.email
        }));
        
        setSuggestions(filteredTeam);
        
        // Comment out actual API call for now to avoid errors in local testing
        fetch(`/api/emails?query=${query}`)
          .then((res) => res.json())
          .then((data) => setSuggestions(data))
          .catch(() => setSuggestions([]));
      } else {
        setSuggestions([]); // Clear suggestions if query is too short
      }
    }, 300); // Debounce delay of 300ms

    return () => clearTimeout(timeout);
  }, [query]);

  // Handle input changes for the form fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Add a member to selectedMembers
  const addMember = (member: { id: string; name: string; email: string }) => {
    // Check if the member is already selected
    // if (!selectedMembers.some(selected => selected.id === member.id)) {
    //   setSelectedMembers(prevMembers => [...prevMembers, member]);
    // }
    setSelectedMembers(prevMembers => [...prevMembers, member]);
    setQuery(''); // Clear the search input
    setSuggestions([]); // Clear suggestions
  };

  // Remove a member from selectedMembers
  const removeMember = (memberId: string) => {
    setSelectedMembers(prevMembers => prevMembers.filter(member => member.id !== memberId));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Clear previous errors
    setSuccess(null); // Clear previous success messages
    setLoading(true); // Indicate loading state

    // Ensure at least one member is selected
    if (selectedMembers.length === 0) {
      setError('Please add at least one member to the team.');
      setLoading(false);
      return;
    }

    try {
      // Extract member IDs for submission
      const memberIds = selectedMembers.map(member => member.id);
      console.log("Selected Members:", selectedMembers);
      console.log("Member IDs:", memberIds);
      
      // Validate form data against the schema
      // Note: You might need to update your schema to handle the array of members
      const validationResult = groupSchema.safeParse({ 
        ...formData, 
        members: memberIds 
      });

      if (!validationResult.success) {
        // If validation fails, set the error message
        const errorMessages = validationResult.error.errors.map((err) => err.message).join(', ');
        setError(errorMessages);
        setLoading(false);
        return;
      }

      // Prepare data to send
      const dataToSend = {
        ...formData,
        members: memberIds
      };
      
      console.log("Submitting form data:", dataToSend);
      
      // Comment out actual API call for now to avoid errors in local testing
      const res = await fetch('/api/group', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Failed to create team');
      }

      // Simulate successful response
      setSuccess('Team created successfully!');
      
      // Reset form
      setFormData({
        name: '',
        description: '',
      });
      setSelectedMembers([]);

      // Close the modal after a short delay
      setTimeout(() => {
        setSuccess(null);
      }, 2000);
    } catch (error) {
      setError(error.message || 'An unexpected error occurred');
    } finally {
      setLoading(false); // Reset loading state
    }
  };

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
                    <button type="button" className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium cursor-pointer">
                      Add member
                    </button>
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
          <form onSubmit={handleSubmit} className="p-3 rounded-lg shadow-lg bg-white dark:bg-gray-800">
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
            
            <h1 className="text-gray-800 dark:text-gray-300 text-lg font-semibold my-3">
              Team name
            </h1>
            <input
              className="border rounded-lg w-full p-1 hover:border-2 hover:border-indigo-500 outline-none px-2 shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
              placeholder="SIR"
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            
            <h1 className="text-gray-800 dark:text-gray-300 text-lg font-semibold my-3">
              Members
            </h1>
            
            {/* Search and add members */}
            <div className="relative mb-4">
              <input
                className="border rounded-lg w-full p-1 hover:border-2 hover:border-indigo-500 px-9 outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 shadow-sm"
                placeholder="Add members by name or email"
                id="memberSearch"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                autoComplete="off"
              />
              <Search
                className="absolute top-2 left-3 text-gray-400"
                size={19}
              />
            </div>
            
            {/* Suggestions dropdown */}
            {suggestions.length > 0 && (
              <ul className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg mt-2 mb-4 max-h-40 overflow-y-auto absolute z-10 w-full md:w-1/3 shadow-lg">
                {suggestions.map((user) => (
                  <li
                    key={user.id}
                    onClick={() => addMember(user)}
                    className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer flex justify-between items-center"
                  >
                    <span>{user.name} ({user.email})</span>
                    <Plus size={16} className="text-blue-500" />
                  </li>
                ))}
              </ul>
            )}
            
            {/* Selected members display */}
            {selectedMembers.length > 0 && (
              <div className="mt-4 border dark:border-gray-700 rounded-lg p-2 mb-4">
                <h2 className="text-gray-700 dark:text-gray-300 font-medium mb-2">Selected Members: {selectedMembers.length}</h2>
                <div className="space-y-2">
                  {selectedMembers.map((member) => (
                    <div key={member.id} className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 p-2 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center text-gray-700 dark:text-gray-200">
                          {member.name}
                        </div>
                        <div>
                          <p className="font-medium text-gray-800 dark:text-gray-200">{member.name}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{member.email}</p>
                        </div>
                      </div>
                      <button 
                        type="button"
                        onClick={() => removeMember(member.id)}
                        className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <h1 className="text-gray-800 dark:text-gray-300 text-lg font-semibold my-3">
              Description
            </h1>
            <textarea
              id="description"
              name="description"
              placeholder="Describe the team in detail..."
              rows={4}
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 resize-y transition-colors"
            />
            
            {error && <Alert type="error" message={error} />}
            {success && <Alert type="success" message={success} />}
            
            <hr className="my-4 border-gray-200 dark:border-gray-700" />
            
            <div className="flex justify-end mt-3">
              <button
                type="submit"
                disabled={loading}
                className={`px-4 py-2 ${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'} dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-lg transition-colors font-medium`}
              >
                {loading ? <Spinner /> : 'Create Team'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Groups;