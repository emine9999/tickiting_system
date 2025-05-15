'use client';
import { getPriorityColor, getStatusColor, formatDate } from '@/lib/utils'; 
import React, { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle, Clock, RefreshCw } from 'lucide-react';
import { useParams } from 'next/navigation';
import Comments from '@/components/comments/Comments';
import { Ticket } from '@/types/types'; // 


const TicketPage = () => {
  // Use useParams hook from Next.js App Router
  const params = useParams();
  const id = params.id;
  
    const [ticket, setTicket] = useState<Ticket | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    const fetchTicket = async () => {
      if (!id) return;
      
      try {
        const response = await fetch(`http://localhost:3000/api/tickets/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch ticket');
        }
        const data = await response.json();
        setTicket(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchTicket();
  }, [id]);




  // Show loading spinner while data is loading
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Show error message if fetching failed
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-red-100 dark:bg-red-900 p-4 rounded-lg flex items-center">
          <AlertCircle className="text-red-500 mr-2" />
          <span className="text-red-800 dark:text-red-200">Error: {error}</span>
        </div>
      </div>
    );
  }

  // If no ticket found
  if (!ticket) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-yellow-100 dark:bg-yellow-900 p-4 rounded-lg flex items-center">
          <AlertCircle className="text-yellow-500 mr-2" />
          <span className="text-yellow-800 dark:text-yellow-200">Ticket not found</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen  text-gray-900 dark:text-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row">
          {/* Main Content */}
          <div className="w-full lg:w-3/4 lg:pr-6">
            <div className="bg-slate-200 dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
              <div className="flex justify-between items-start flex-wrap gap-4 mb-6">
                <div>
                  <h1 className="text-2xl font-bold mb-2">{ticket.title}</h1>
                  <div className="flex flex-wrap gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(ticket.priority)}`}>
                      Priority: {ticket.priority}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(ticket.status)}`}>
                      Status: {ticket.status}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                      Type: {ticket.type}
                    </span>
                  </div>
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  <p>ID: {ticket.id}</p>
                  <p>Created: {formatDate(ticket.createdAt)}</p>
                  <p>Updated: {formatDate(ticket.updatedAt)}</p>
                </div>
              </div>

              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-3">Description</h2>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <p>{ticket.description}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h2 className="text-xl font-semibold mb-3">Assignment Info</h2>
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <p><span className="font-medium">User ID:</span> {ticket.userId}</p>
                    <p><span className="font-medium">Assigned To:</span> {ticket.assignedToId}</p>
                  </div>
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-3">Timeline</h2>
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <Clock className="w-4 h-4 mr-2 text-blue-500" />
                      <span>Created on {formatDate(ticket.createdAt)}</span>
                    </div>
                    <div className="flex items-center">
                      <RefreshCw className="w-4 h-4 mr-2 text-green-500" />
                      <span>Last updated on {formatDate(ticket.updatedAt)}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-3">Actions</h2>
                <div className="flex flex-wrap gap-2">
                  <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Mark as Resolved
                  </button>
                  <button className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-md flex items-center">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Update Status
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Chat Sidebar */}
          <div className="w-full lg:w-1/4 relative overflow-y-auto max-h-[90vh] ">
            <Comments ticketId={ticket.id}  />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketPage;