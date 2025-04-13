'use client';

import { useState, useEffect } from 'react';
import Alert from '@/components/Alert';
import Spinner from '@/components/Spinner';
import { ticketSchema } from '@/lib/ticketSchema';

export default function AddTicket({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [formData, setFormData] = useState({
    title: '',
    priority: 'medium',
    status: 'open',
    type: 'bug',
    assignee: '',
    description: ''
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState(''); // Search input for email
  const [suggestions, setSuggestions] = useState<{ id: string; name: string; email: string }[]>([]); // Suggestions for email
  const [selectedAssignee, setSelectedAssignee] = useState<string | null>(null); // Selected email

  // Fetch emails from the database based on query
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (query.length > 2) {
        fetch(`/api/emails?query=${query}`)  // Updated query parameter syntax
          .then((res) => res.json())
          .then((data) => setSuggestions(data))  // Assumes data is an array of email users
          .catch(() => setSuggestions([])); // Clear suggestions on error
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

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Clear previous errors
    setSuccess(null); // Clear previous success messages
    setLoading(true); // Indicate loading state

    // Ensure an assignee is selected from the suggestions
    if (!selectedAssignee) {
      setError('Please select a valid assignee from the suggestions.');
      setLoading(false);
      return;
    }

    try {
      // Validate form data against the schema
      const validationResult = ticketSchema.safeParse({ ...formData, assignee: selectedAssignee });

      if (!validationResult.success) {
        // If validation fails, set the error message
        const errorMessages = validationResult.error.errors.map((err) => err.message).join(', ');
        setError(errorMessages);
        setLoading(false);
        return;
      }

      // Simulate API call
      const res = await fetch('/api/tickets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, assignee: selectedAssignee }),
      });

      const data = await res.json(); // Extract response body as JSON

      if (!res.ok) {
        throw new Error(data.message || 'Failed to create ticket'); // Handle error message from API
      }

      setSuccess(data.message || 'Ticket created successfully!');
      setFormData({
        title: '',
        priority: 'medium',
        status: 'open',
        type: 'bug',
        assignee: '',
        description: '',
      });
      setSelectedAssignee(null);
      setQuery('');
      setSuggestions([]);

      // Close the modal after a short delay
      setTimeout(() => {
        setSuccess(null);
        onClose();
      }, 2000);
    } catch (error) {
      setError(error.message || 'An unexpected error occurred');
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 dark:bg-white/10 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg w-full max-w-md transition-all duration-200 border border-gray-200 dark:border-gray-700">
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-6">Add New Ticket</h2>

          {loading ? (
            <Spinner />
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Ticket Name
                </label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  placeholder="Enter ticket title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border outline-none border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="priority" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Priority
                  </label>
                  <select
                    id="priority"
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Status
                  </label>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors"
                  >
                    <option value="open">Open</option>
                    <option value="closed">Closed</option>
                    <option value="in-progress">In Progress</option>
                    <option value="rejected">Rejected</option>
                    <option value="pending">Pending</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="assignee" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Assign To (by Email)
                </label>
                <input
                  id="assignee"
                  type="text"
                  placeholder="Search by email"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors"
                />
                {suggestions.length > 0 && (
                  <ul className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg mt-2 max-h-40 overflow-y-auto">
                    {suggestions.map((user) => (
                      <li
                        key={user.id}
                        onClick={() => {
                          setSelectedAssignee(user.email);
                          setQuery(user.email);
                          setSuggestions([]);
                        }}
                        className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
                      >
                        {user.name} ({user.email})
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  placeholder="Describe the ticket in detail..."
                  rows={4}
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 resize-y transition-colors"
                />
              </div>

              {error && <Alert type="error" message={error} />}
              {success && <Alert type="success" message={success} />}

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className={`px-4 py-2 ${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'} dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-lg transition-colors font-medium`}
                >
                  {loading ? 'Submitting...' : 'Submit'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
