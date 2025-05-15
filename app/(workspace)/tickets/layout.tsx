
import { ReactNode } from "react";

import { getTickets } from "@/actions/Ticket.action"; 
import ChatHeader from "@/components/ChatHeader";
export default async function TicketLayout({ children }: { children: ReactNode }) {

  const tickets = await getTickets();

  return (
    <div>
      <header>
        <ChatHeader tickets={tickets} />
      </header>

      <main>{children}</main>

      <footer></footer>
    </div>
  );
}