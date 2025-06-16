'use client'
import { Home, Bot, TicketCheck } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search ,UsersRound,Pin,BellRing,FileSearch,LogOut ,MonitorDown } from 'lucide-react';
import ModeToggle  from './ModeToggle';
import Ticket from '@/components/Ticket'
import Link from 'next/link'
import { useSession,signOut } from "next-auth/react";
import AdminNav from '@/components/AdminNav'

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarHeader,
} from '@/components/ui/sidebar';


// Menu items.
const items = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: Home,
  },
  {
    title: 'AI & Analysis',
    url: '/analysis',
    icon: Bot,
  },
  {
    title: 'Ticket',
    url: '/tickets',
    icon: TicketCheck,
  },
  {
    title: 'Meetings',
    url: '/meetings',
    icon: MonitorDown,
  },
  {
    title: 'Documentation',
    url: '/documents',
    icon: FileSearch,
  },
  // {
  //   title: 'Report',
  //   url: '/report',
  //   icon: ChartNoAxesCombined,
  // },

];


const tickets = [
  {
    id: 1,
    title: 'TC-101-Prod',
  },
  {
    id: 2,
    title: 'TC-102-Prod',
  },
  {
    id: 3,
    title: 'TC-103-Prod',
  },
  {
    id: 4,
    title: 'TC-104-Prod',
  },
  {
    id: 5,
    title: 'TC-105-Prod',
  },
  {
    id: 6,
    title: 'TC-104-Prod',
  },
  {
    id: 7,
    title: 'TC-104-Prod',
  },
  {
    id: 8,
    title: 'TC-104-Prod',
  },
  {
    id: 9,
    title: 'TC-104-Prod',
  },
];

export function AppSidebar({ onButtonClick }: { onButtonClick: () => void }) {
  const { data: session } = useSession();
  
  return (
    <Sidebar>
     <SidebarHeader>
    <Link href='/profile'>
    <div className="flex items-center w-fit gap-3 justify-start ml-3 py-3">
        <Avatar className="lg:w-14 lg:h-14 rounded-full ring-1 ring-gray-300 dark:ring-gray-700">
          <AvatarImage src={session?.user?.image || "/data/u.png" } />
          <AvatarFallback>{session?.user?.name?.charAt(0) || "CN"}</AvatarFallback>
        </Avatar>
        <div>
          <p className="w-full">
            
            {session?.user?.name}
          </p>
          <h2 className="text-sm text-gray-400">{session?.user?.role?.name || "USER"}</h2>
        </div>
      </div>
    </Link>
      <hr />
    </SidebarHeader>
      <SidebarContent >
        <SidebarGroup>
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none outline-none">
            <Search size={22} />
          </div>
          <input
            type="text"
            className="w-full p-1 pl-10 rounded-lg border"
            placeholder="Search"
          />
        </div>
          </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu></SidebarMenu>
          </SidebarGroupContent>

          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu className="space-y-3 ">
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.url}>
                        <item.icon style={{ width: "20px", height: "20px" }}/>
                        
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                   
                  </SidebarMenuItem>
                ))}
             
                 {/* <div className='w-full  gap-2 flex justify-start px-2 py-1 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg items-center'>
                      <BellRing/>
                    <button className='cursor-pointer' onClick={ onButtonClick }>
                      Notification
                    </button>
                    </div> */}
                   
                   {session?.user?.role?.name === "ADMIN" && <AdminNav />}
                   
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          {/* groupe 2 of the sidebar */}
          <SidebarGroup >
            <div className='flex justify-around    w-full py-7 '>
              <h1 className='font-bold text-slate-500 text-xs underline'> PINNED TICKETS</h1><button className='font-bold text-xs'>Unpin All</button>
            </div>
            <SidebarGroupContent className='max-h-[16rem] overflow-auto hide-scrollbar' >
              <SidebarMenu className="space-y-2 ">
                {tickets.map((ticket) => (
                  <SidebarMenuItem key={ticket.id}>
                    <SidebarMenuButton className=" flex justify-evenly">
                       <div className='w-6 h-6 rounded-full bg-[#2DB976] flex items-center justify-center'><UsersRound size={17}/></div>
                        <span>{ticket.title}</span>
                        <Pin size={17} />
                    </SidebarMenuButton>
                   
                   
                  </SidebarMenuItem>

                ))}
              
              </SidebarMenu>
              
            </SidebarGroupContent>
          </SidebarGroup>
          {/* end of grp 2 */}
      {/* <Ticket/> */}
        </SidebarGroup>
      </SidebarContent>


      {/* logout and night mode */}
      <SidebarGroup >
           
            <SidebarGroupContent >
              <SidebarMenu >
                
                  <SidebarMenuItem className="flex justify-around flex-row p-3  border">
              
                    <button onClick={() => signOut()} className="flex justify-around items-center flex-row p-2 rounded-2xl gap-2 hover:bg-slate-400 px-3 cursor-pointer border ">
                      <LogOut size={17} />
                      <span>Logout</span>
                    </button>
                    
                      <ModeToggle />
                  </SidebarMenuItem>
                
              
              </SidebarMenu>
              
            </SidebarGroupContent>
          </SidebarGroup>
      <SidebarFooter className=" flex justify-center flex-row border-t items-center ">
      

           <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">T</span>
            </div>
            <span className="font-semibold text-gray-900 dark:text-white text-lg">
              TickHub
            </span>
       
      </SidebarFooter>
    </Sidebar>
  );
}
