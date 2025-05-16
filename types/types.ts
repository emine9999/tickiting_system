import { Conversation, Message, User as PrismaUser } from "@prisma/client";

export type Ticket = {
  id: string;
  clientName: string;
  category:
    | "Billing"
    | "Technical Support"
    | "General Inquiry"
    | "Account Management"
    | "Bug Report"
    | "Feature Request";
  status: "open" | "in progress" | "pending" | "resolved" | "closed";
  priority: "low" | "medium" | "high" | "critical";
  description: string;
  requestDate: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  assignedToId: string;
  title: string;
  type: string;
  comments: Comment[];
};

export type User = {
  id: number;
  username: string;
  email: string;
  role: string;
  group: string;
  status: string;
  image: string;
  actions: {
    reset_password: string;
    delete: string;
  };
};

// interface Actions {
//   reset_password: string;
//   delete: string;
// }

// interface User {
//   username: string;
//   role: "Admin" | "User";  // You can add more roles if needed
//   email: string;
//   group: string;
//   status: "Active" | "Inactive" | "Pending";  // Adding Pending as part of the possible statuses
//   actions: Actions;
// }

export type FullMessageType = Message & {
  sender: User;
  seen: User[];
};

export type FullConversationType = Conversation & {
  users: User[];
  messages: FullMessageType[];
};

export interface BodyProps {
  initialMessages: FullMessageType[];
}
