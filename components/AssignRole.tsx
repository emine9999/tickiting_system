"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Alert from "@/components/Alert";
import Spinner from "@/components/Spinner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, X } from "lucide-react"; // Import missing icons
import { useState, useEffect } from "react";

export default function AddUser({ GroupName }: { GroupName: string }) {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<
    { id: string; name: string; email: string }[]
  >([]);
  const [selectedMembers, setSelectedMembers] = useState<
    Array<{ id: string;name: string; email: string }>
  >([]);

  // Simulated team data (replace with actual API call)
  const team = [
    { id: "1", name: "John Doe", email: "john@example.com" },
    { id: "2", name: "Jane Smith", email: "jane@example.com" },
  ];

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (query.length > 1) {
        const filteredTeam = team.filter((member) =>
          member.email.toLowerCase().includes(query.toLowerCase())
        );
        setSuggestions(filteredTeam);
      } else {
        setSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [query]);

  const addMember = (member: { id: string; name: string; email: string }) => {
    if (!selectedMembers.some((selected) => selected.id === member.id)) {
      setSelectedMembers((prevMembers) => [...prevMembers, member]);
    }
    setQuery("");
    setSuggestions([]);
  };

  const removeMember = (memberId: string) => {
    setSelectedMembers((prevMembers) =>
      prevMembers.filter((member) => member.id !== memberId)
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    if (selectedMembers.length === 0) {
      setError("Please add at least one member to the team.");
      setLoading(false);
      return;
    }

    try {
      const memberemail = selectedMembers.map((member) => member.email);
      const dataToSend = { members: memberemail, GroupName };

      const res = await fetch("/api/group", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to create team");
      }

      setSuccess("Team created successfully!");
      setSelectedMembers([]);
      setTimeout(() => setSuccess(null), 2000);
    } catch (error) {
      setError((error as Error).message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };


  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="bg-indigo-600 text-white cursor-pointer hover:bg-indigo-500 hover:text-gray-300"
        >
          Assign Role
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Assign This Role to a Member</DialogTitle>
          <DialogDescription>User Role</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Email
            </Label>
            <Input
              id="memberSearch"
              value={query}
              placeholder="Search by Email"
              onChange={(e) => setQuery(e.target.value)}
              autoComplete="off"
              className="col-span-4"
            />
          </div>

          {/* Suggestions dropdown */}
          {suggestions.length > 0 && (
            <ul className="bg-gray-300 dark:bg-gray-700 border border-gray-300 right-0 top-12 dark:border-gray-600 rounded-lg mt-2 mb-4 max-h-40 overflow-y-auto absolute z-10 w-full  shadow-lg">
              {suggestions.map((user) => (
                <li
                  key={user.id}
                  onClick={() => addMember(user)}
                  className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer flex justify-between items-center"
                >
                  <span>
                    {user.name} ({user.email})
                  </span>
                  <Plus size={16} className="text-blue-500" />
                </li>
              ))}
            </ul>
          )}

          {/* Selected members display */}
          {selectedMembers.length > 0 && (
            <div className="mt-4 border dark:border-gray-700 rounded-lg p-2 mb-4">
              <h2 className="text-gray-700 dark:text-gray-300 font-medium mb-2">
                Selected Members: {selectedMembers.length}
              </h2>
              <div className="space-y-2">
                {selectedMembers.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 p-2 rounded-lg"
                  >
                    <div className="flex items-center space-x-2">
                     
                      <div>
                        <p className="font-medium text-gray-800 dark:text-gray-200">
                          {member.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {member.email}
                        </p>
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
           <Button type="submit" className="bg-indigo-500 hover:bg-indigo-700">
          {loading ? <Spinner /> : 'Assign'}
          </Button>
        </form>
        {error && <Alert type="error" message={error} />}
        {success && <Alert type="success" message={success} />}

      </DialogContent>
    </Dialog>
  );
}
