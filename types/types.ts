export type Ticket = {
    id: string;
    clientName: string;
    category: "Billing" | "Technical Support" | "General Inquiry" | "Account Management" | "Bug Report" | "Feature Request";
    status: "open" | "in progress" | "pending" | "resolved" | "closed";
    priority: "low" | "medium" | "high" | "critical";
    description: string;
    requestDate: string; 
  };