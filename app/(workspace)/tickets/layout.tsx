'use client';

import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';
import { Plus,ArrowLeft,Pin} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import AddTicket from '@/components/AddTicket';
import AddNewTicket from '@/components/AddNewTicket';

export default function TicketLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [showModal, setShowModal] = useState(false);


  return (
    <div>
      <header>
        {pathname === '/tickets' && 
        <div className="flex justify-between  items-center mx-2 sm:mx-4 lg:mx-8 xl:mx-12 2xl:mx-16 ">
            <h3 className='text-xl font-bold'>Tickets</h3>
        {/* <button onClick={() => setShowModal(true)} className="flex items-center gap-2 justify-center px-2 md:px-4 py-2.5 cursor-pointer bg-emerald-600 dark:bg-emerald-500 rounded-lg text-sm font-medium text-white hover:bg-emerald-700 dark:hover:bg-emerald-600 transition-colors shadow-sm">
          Add Ticket
          <Plus size={16} />
        </button> */}
         <AddNewTicket/>
          </div>        
      }
        {pathname.startsWith('/tickets/') && 
        
        <div className="flex justify-between  items-center mx-2 sm:mx-4 lg:mx-8 xl:mx-12 2xl:mx-16 ">
        <Link href="/tickets">
            <div className='flex items-center gap-2 cursor-pointer'>
                <ArrowLeft size={22}></ArrowLeft>
                <h3 className='text-xl font-bold'>Ticket List</h3>
            </div>
        </Link>
            <div className='flex items-center gap-2'>
                <p className='text-xl font-bold'>TC-293</p>
                <h3 className=' bg-slate-200 px-2 rounded-full dark:bg-slate-600'>SQL ERROR</h3>
                <Pin size={20}></Pin>
            </div>
            <AddNewTicket/>
          </div>

        }
        {!pathname.startsWith('/tickets') && <div>Default Header</div>}
      </header>

      <main >{children}</main>
      {/* <AddTicket isOpen={showModal} onClose={() => setShowModal(false)} /> */}
    
      <footer></footer>
    </div>
  );
}