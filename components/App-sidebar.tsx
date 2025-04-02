'use client'
import { Home, Bot, TicketCheck } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search ,UsersRound,Pin,BellRing,FileSearch,ChartNoAxesCombined,LogOut  } from 'lucide-react';
import ModeToggle  from './ModeToggle';
import Notification from '@/components/Notification'
import Ticket from '@/components/Ticket'
import UserProfile from '@/components/UserProfile'
import { useSession,signOut } from "next-auth/react";


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
  // {
  //   title: 'Notification',
  //   url: '#',
  //   icon: BellRing,
  // },
  {
    title: 'Documentation',
    url: '/documentation',
    icon: FileSearch,
  },
  {
    title: 'Report',
    url: '/report',
    icon: ChartNoAxesCombined,
  },
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

export function AppSidebar() {
  const { data: session } = useSession();
  
  return (
    <Sidebar>
     <SidebarHeader>
      <div className="flex items-center w-fit gap-3 justify-start ml-3 py-3">
        <Avatar className="lg:w-14 lg:h-14 rounded-full">
          <AvatarImage src={session?.user?.image || "https://github.com/shadcn.png"} />
          <AvatarFallback>{session?.user?.name?.charAt(0) || "CN"}</AvatarFallback>
        </Avatar>
        <div>
          <button className="w-full">
            <UserProfile />
          </button>
          <h2 className="text-sm text-gray-400">{session?.user?.name || "Agent Admin"}</h2>
        </div>
      </div>
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
              <SidebarMenu className="space-y-3">
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
                 <div className='w-full  gap-2 flex justify-start px-2 py-1 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg items-center'>
                      <BellRing/>
                    <Notification />
                    </div>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          {/* groupe 2 of the sidebar */}
          <SidebarGroup >
            <div className='flex justify-around    w-full py-7 '>
              <h1 className='font-bold text-slate-500 text-xs underline'> PINNED TICKETS</h1><button className='font-bold text-xs'>Unpin All</button>
            </div>
            <SidebarGroupContent className='max-h-[16rem] overflow-auto' >
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
      <Ticket/>
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
      <SidebarFooter className=" flex justify-center  border-t items-center ">
        <div className="flex flex-row justify-center items-center">
          <h1 className="font-bold text-2xl ">TICK</h1> <span>hub</span>
        </div>
       
      </SidebarFooter>
    </Sidebar>
  );
}
