'use client';
import React, { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import { columns } from '@/app/(settings)/users/columns';
import { DataTableDemo } from '@/app/(settings)/users/data-table';
import { AddUser } from '@/components/AddUser';
// import user from '@/data/users'
export default function Users() {
  const [users, setUsers] = useState([]); // État pour stocker les utilisateurs
  const [loading, setLoading] = useState(true); // État pour le chargement
  const [error, setError] = useState<string | null>(null); // État pour les erreurs

  // Récupérer les utilisateurs depuis l'API
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch('/api/users', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });

        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.message || 'Failed to fetch users');
        }

        const data = await res.json();
        setUsers(data); // Mettre à jour l'état avec les utilisateurs récupérés
      } catch (err: any) {
        setError(err.message || 'An unexpected error occurred');
      } finally {
        setLoading(false); // Désactiver l'état de chargement
      }
    };

    fetchUsers();
  }, []); // Exécuter une seule fois au montage du composant

  return (
    <div className="h-screen w-full py-3 pl-24">
      {/* Header Section */}
      <div className="flex justify-between items-center mx-2">
        <h3 className="text-2xl font-bold">Users</h3>
        <div className="hidden md:flex items-center space-x-2">
          <AddUser />
          <Plus size={16} />
        </div>
      </div>

      {/* Data Table Section */}
      <div className="container mx-auto">
        {loading && <p>Loading...</p>} {/* Afficher un message de chargement */}
        {error && <p className="text-red-500">{error}</p>} {/* Afficher un message d'erreur */}
        {!loading && !error && (
          <DataTableDemo columns={columns()} data={users} />
        )}
        {/* <DataTableDemo columns={columns()} data={user} /> */}
      </div>
    </div>
  );
}