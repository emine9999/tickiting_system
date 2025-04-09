import {User} from '@/types/types'

const users: User[] = [
    {
      id: 1,
      username: "john.doe",
      role: "Admin",
      email: "john.doe@example.com",
      group: "Management",
      status: "Active",
      actions: {
        reset_password: "https://example.com/reset-password/jane.smith",
        delete: "https://example.com/delete/john.doe"
      }
    },
    {
      id: 2,
      username: "jane.smith",
      role: "User",
      email: "jane.smith@example.com",
      group: "Sales",
      status: "Inactive",
      actions: {
        reset_password: "https://example.com/reset-password/jane.smith",
        delete: "https://example.com/delete/jane.smith"
      }
    },
    {
      id: 3,
      username: "alice.jones",
      role: "User",
      email: "alice.jones@example.com",
      group: "Engineering",
      status: "Active",
      actions: {
        reset_password: "https://example.com/reset-password/alice.jones",
        delete: "https://example.com/delete/alice.jones"
      }
    },
    {
      id: 4,
      username: "bob.brown",
      role: "User",
      email: "bob.brown@example.com",
      group: "Support",
      status: "Pending",
      actions: {
        reset_password: "https://example.com/reset-password/bob.brown",
        delete: "https://example.com/delete/bob.brown"
      }
    }
  ];
  
  
  export default users;