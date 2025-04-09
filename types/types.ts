export type Ticket = {
    id: string;
    clientName: string;
    category: "Billing" | "Technical Support" | "General Inquiry" | "Account Management" | "Bug Report" | "Feature Request";
    status: "open" | "in progress" | "pending" | "resolved" | "closed";
    priority: "low" | "medium" | "high" | "critical";
    description: string;
    requestDate: string; 
  };


  export type User ={
    id : number;
    username : string;
    email : string;
    role : string;
    group : string;
    status : string;
    actions : {
      reset_password: string;
      delete: string;
    }
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