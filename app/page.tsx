import React from 'react';
import { LuTickets } from "react-icons/lu";
import Link from 'next/link';
import Image from 'next/image';
import { FaRegPlayCircle } from "react-icons/fa";

const Page = () => {
  return (
    <div className="bg-gradient-to-b from-[#0a0a1a] to-[#272666] text-white">
      {/* Navigation Bar */}
      <nav className="px-4 sm:px-8 lg:px-16 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <LuTickets size={28} className="text-blue-400" />
          <span className="text-2xl font-bold">TICKhub</span>
        </div>
        
        <div className="hidden md:flex space-x-8">
          <Link href="/">
            <span className="hover:text-blue-400 transition-colors">Accueil</span>
          </Link>
          <Link href="/features">
            <span className="hover:text-blue-400 transition-colors">Fonctionnalités</span>
          </Link>
          <Link href="/resources">
            <span className="hover:text-blue-400 transition-colors">Ressources</span>
          </Link>
          <Link href="/pricing">
            <span className="hover:text-blue-400 transition-colors">Tarification</span>
          </Link>
        </div>
        
        <div className="flex gap-3">
          <Link href="/auth">
            <button className="px-4 py-2 bg-transparent border border-blue-400 rounded-md text-blue-400 hover:bg-blue-400/10 transition-colors">
              Connexion
            </button>
          </Link>
          <Link href="/auth">
            <button className="px-4 py-2 bg-blue-600 rounded-md text-white hover:bg-blue-500 transition-colors">
              S&apos;inscrire
            </button>
          </Link>
        </div>
      </nav>

      {/* Hiring Banner */}
      <div className="flex justify-center mt-6">
        <div className="bg-[#1a1a3a] px-4 py-2 rounded-full flex items-center space-x-2">
          <span className="text-sm">Create Your First Ticket!</span>
          <Link href="/auth">
            <span className="text-sm text-blue-400 hover:underline flex items-center">
              Rejoignez notre platforme
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <div className="px-4 sm:px-8 lg:px-16 py-16 md:py-28 text-center max-w-5xl mx-auto relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Gérez Tous Vos Tickets En Un Seul Endroit Efficacement
        </h1>
        <p className="text-lg text-gray-300 mb-8 max-w-3xl mx-auto">
          Gérez votre travail, les délais et les assignations en un clic. Définissez et suivez les priorités, assignez les tâches et suivez vos projets facilement.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          {/* <div className="relative max-w-sm w-full">
            <input
              type="email"
              placeholder="Entrez votre email"
              className="w-full px-4 py-3 rounded-full bg-[#1a1a3a] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div> */}
          <button className="px-6 py-3 bg-white rounded-full font-medium hover:bg-[#1a1a3a] cursor-pointer hover:text-white transition-colors text-slate-800">
            Get Started
          </button>
          <button className="px-6 py-3 bg-transparent border rounded-full items-center gap-2 flex font-medium hover:bg-[#1a1a3a] cursor-pointer hover:border-blue-400 hover:border-2 transition-colors text-white">
            Demo
            <FaRegPlayCircle />
          </button>
        </div>
      </div>

      {/* Dashboard Preview */}
      <div className="px-4 sm:px-8 lg:px-16 mb-16">
        <Image
          src="/data/dash.jpg"
          width={1200}
          height={800}
          alt="Dashboard Preview"
          className="w-full h-auto rounded-lg shadow-lg border border-gray-800"
        />
      </div>
    </div>
  );
};

export default Page;