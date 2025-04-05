'use client';

import React, { useState, useEffect } from 'react';
import { MessageSquare, X, Send, AlertCircle, CheckCircle, Clock, RefreshCw } from 'lucide-react';
import { useParams } from 'next/navigation';

const TicketPage = () => {
  // Use useParams hook from Next.js App Router
  const params = useParams();
  const id = params.id;
  
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [chatLoading, setChatLoading] = useState(false);

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

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;

    // Add user message to chat history
    const userMessage = { sender: 'user', text: chatMessage };
    setChatHistory([...chatHistory, userMessage]);
    setChatMessage('');
    setChatLoading(true);

    // Simulate AI response (replace with actual API call)
    setTimeout(() => {
      const aiResponse = { 
        sender: 'ai', 
        text: `I've analyzed your ticket about "${ticket.title}". Based on the description, this appears to be a known issue. Please try clearing your browser cache or restarting the application.` 
      };
      setChatHistory(prevHistory => [...prevHistory, aiResponse]);
      setChatLoading(false);
    }, 1000);
  };

  const toggleChat = () => {
    setChatOpen(!chatOpen);
  };

  const getPriorityColor = (priority) => {
    switch(priority.toLowerCase()) {
      case 'high':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default:
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
    }
  };

  const getStatusColor = (status) => {
    switch(status.toLowerCase()) {
      case 'open':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'in_progress':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'resolved':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'closed':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
      default:
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

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
            <div className={`fixed bottom-6 right-6 lg:right-auto lg:bottom-auto lg:relative z-10 ${chatOpen ? 'lg:block' : ''}`}>
              {/* Chat toggle button */}
              <button 
                onClick={toggleChat}
                className={`flex items-center justify-center p-3 rounded-full shadow-lg 
                  ${chatOpen 
                    ? 'bg-red-500 hover:bg-red-600 absolute top-2 right-2 z-20 lg:hidden' 
                    : 'bg-blue-500 hover:bg-blue-600 lg:hidden'
                  }`}
              >
                {chatOpen ? <X className="h-6 w-6 text-white" /> : <MessageSquare className="h-6 w-6 text-white" />}
              </button>
              
              {/* Chat widget */}
              <div 
                className={`
                  bg-white dark:bg-gray-800 rounded-lg shadow-lg 
                  transition-all duration-300 ease-in-out 
                  flex flex-col 
                  ${chatOpen 
                    ? 'opacity-100 visible max-h-96 w-80 lg:w-full lg:max-h-full lg:h-full lg:min-h-screen' 
                    : 'opacity-0 invisible max-h-0 w-0 lg:opacity-100 lg:visible lg:max-h-full lg:w-full lg:min-h-screen'
                  }
                `}
              >
                <div className="p-4 border-b dark:border-gray-700 flex justify-between items-center">
                  <h3 className="font-semibold">Support Assistant</h3>
                  <button onClick={toggleChat} className="lg:hidden">
                    <X className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  </button>
                </div>
                
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {chatHistory.length === 0 ? (
                    <div className="text-center text-gray-500 dark:text-gray-400 py-8">
                      <MessageSquare className="h-8 w-8 mx-auto mb-2" />
                      <p>Ask for help with this ticket</p>
                    </div>
                  ) : (
                    chatHistory.map((message, index) => (
                      <div 
                        key={index} 
                        className={`
                          ${message.sender === 'user' 
                            ? 'ml-auto bg-blue-500 text-white' 
                            : 'mr-auto bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                          }
                          max-w-[80%] rounded-lg p-3
                        `}
                      >
                        {message.text}
                      </div>
                    ))
                  )}
                  
                  {chatLoading && (
                    <div className="mr-auto bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 max-w-[80%] rounded-lg p-3">
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                      </div>
                    </div>
                  )}
                </div>
                
                <form onSubmit={handleSendMessage} className="p-4 border-t dark:border-gray-700 flex items-center">
                  <input
                    type="text"
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 py-2 px-3 bg-gray-100 dark:bg-gray-700 rounded-l-md focus:outline-none dark:text-white"
                  />
                  <button 
                    type="submit" 
                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-r-md"
                    disabled={chatLoading}
                  >
                    <Send className="h-5 w-5" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketPage;