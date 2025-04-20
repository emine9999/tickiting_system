'use client';
import Image from "next/image";
import { useState, useEffect } from "react";
import { Plus, Search, X } from "lucide-react";
import Alert from '@/components/Alert';
import Spinner from '@/components/Spinner';
import { groupSchema } from "@/lib/groupSchema";

const AddTeam = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<{ id: string; name: string; email: string }[]>([]);
  const [selectedMembers, setSelectedMembers] = useState<Array<{ id: string; name: string; email: string }>>([]);
  const [fetchingUsers, setFetchingUsers] = useState(false);

  // Handle search query changes with debounce
  useEffect(() => {
    // Clear suggestions if query is empty
    if (!query || query.length < 2) {
      setSuggestions([]);
      return;
    }

    const fetchUsers = async () => {
      setFetchingUsers(true);
      try {
        // Fetch users from API based on search query
        const res = await fetch(`/api/users?query=${encodeURIComponent(query)}`);
        
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.message || 'Failed to fetch users');
        }

        const users = await res.json();
        
        // Filter out users that are already selected
        const filteredUsers = users.filter(user => 
          !selectedMembers.some(member => member.id === user.id)
        );
        
        setSuggestions(filteredUsers);
      } catch (err) {
        if (err instanceof Error) {
          console.error("Error fetching users:", err.message);
        }
        setSuggestions([]);
      } finally {
        setFetchingUsers(false);
      }
    };

    // Debounce search to avoid excessive API calls
    const timeoutId = setTimeout(() => {
      fetchUsers();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query, selectedMembers]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const addMember = (member: { id: string; name: string; email: string }) => {
    if (!selectedMembers.some((selected) => selected.id === member.id)) {
      setSelectedMembers((prevMembers) => [...prevMembers, member]);
    }
    setQuery("");
    setSuggestions([]);
  };

  const removeMember = (memberId: string) => {
    setSelectedMembers(prevMembers => prevMembers.filter(member => member.id !== memberId));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    if (!formData.name || !formData.description) {
      setError('Please provide a team name and description.');
      setLoading(false);
      return;
    }

    if (selectedMembers.length === 0) {
      setError('Please add at least one member to the team.');
      setLoading(false);
      return;
    }

    try {
      const memberEmails = selectedMembers.map(member => member.email);

      const validationResult = groupSchema.safeParse({
        ...formData,
        members: memberEmails,
      });

      if (!validationResult.success) {
        const errorMessages = validationResult.error.errors.map(err => err.message).join(', ');
        setError(errorMessages);
        setLoading(false);
        return;
      }

      const res = await fetch('/api/group', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, members: memberEmails }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Failed to create team');
      }

      setSuccess('Team created successfully!');
      setFormData({ name: '', description: '' });
      setSelectedMembers([]);

      setTimeout(() => setSuccess(null), 2000);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || 'An unexpected error occurred');
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
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
            aria-label="Search for users to add"
          />
          <div className="absolute top-2 left-3 text-gray-400">
            {fetchingUsers ? <Spinner /> : <Search size={19} />}
          </div>
        </div>

        {/* Suggestions dropdown */}
        {suggestions.length > 0 && (
          <ul 
            className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg mt-2 mb-4 max-h-40 overflow-y-auto absolute z-10 w-full md:w-1/3 shadow-lg"
            role="listbox"
            aria-label="User suggestions"
          >
            {suggestions.map((user) => (
              <li
                key={user.id}
                onClick={() => addMember(user)}
                className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer flex justify-between items-center"
                role="option"
                aria-selected="false"
              >
                <span>{user.name} ({user.email})</span>
                <Plus size={16} className="text-blue-500" />
              </li>
            ))}
          </ul>
        )}

        {/* No results message */}
        {query.length >= 2 && !fetchingUsers && suggestions.length === 0 && (
          <div className="text-gray-500 dark:text-gray-400 text-sm p-2 mb-4">
            No matching users found
          </div>
        )}

        {/* Selected members display */}
        {selectedMembers.length > 0 && (
          <div className="mt-4 border dark:border-gray-700 rounded-lg p-2 mb-4">
            <h2 className="text-gray-700 dark:text-gray-300 font-medium mb-2">Selected Members: {selectedMembers.length}</h2>
            <div className="space-y-2">
              {selectedMembers.map((member) => (
                <div key={member.id} className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 p-2 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <div>
                      <p className="font-medium text-gray-800 dark:text-gray-200">{member.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{member.email}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeMember(member.id)}
                    className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                    aria-label={`Remove ${member.name}`}
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
  );
};

export default AddTeam;