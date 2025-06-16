'use client';
import { columns } from '@/app/(workspace)/tickets/columns'
import { DataTableDemo } from '@/app/(workspace)/tickets/data-table'
import React, { useEffect, useState } from 'react';
import Loader from '@/components/Loader';
export default  function Tickets() {

    const [tickets, setTickets] = useState([]); 
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState<string | null>(null); 
  
    
    useEffect(() => {
      const fetchTickets = async () => {
        setLoading(true);
        setError(null);
  
        try {
          const res = await fetch('/api/tickets',{
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          });
          
          // if (!res.ok) {
          //   const data = await res.json();
          //   throw new Error(data.message || 'Failed to fetch tickets');
          // }
  
          const data = await res.json();
          console.log ("tickets",  data);
          setTickets(data); 
        } catch (err: any) {
          setError(err.message || 'An unexpected error occurred');
        } finally {
          setLoading(false); 
        }
      };
  
      fetchTickets ();
    }, []); // Exécuter une seule fois au montage du composant
  return (
      <div className="container mx-auto px-6">
        {loading && <Loader/>} 
        {error && <p className="text-red-500">{error}</p>} 
        {!loading && !error && (
          <DataTableDemo columns={columns} data={tickets} />
        )}
        
      </div>
  )
}
