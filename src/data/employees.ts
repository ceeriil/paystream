export interface Employee {
  id: string; // wallet address
  name: string;
  title: string;
  employmentType: string;
  walletAddress: string; // primary wallet address
  additionalWallets: string[]; // additional wallet addresses for payments
  email: string;
}

export const employees: Employee[] = [
  {
    id: "BuPXEVr7SzknmQ3VU8nvrECvwxwAMagRQKRJ3gqse3A9",
    name: "John Doe",
    title: "Senior Developer",
    employmentType: "Full Time",
    walletAddress: "BuPXEVr7SzknmQ3VU8nvrECvwxwAMagRQKRJ3gqse3A9",
    additionalWallets: ["0xabcd...efgh", "0x9012...3456"],
    email: "john.doe@example.com",
  },
  {
    id: "GCqCqmBrXuhsA9QypAXLxcA3GCpcWXnQmajvMah9ZDBS",
    name: "Jane Smith",
    title: "Product Manager",
    employmentType: "Full Time",
    walletAddress: "GCqCqmBrXuhsA9QypAXLxcA3GCpcWXnQmajvMah9ZDBS",
    additionalWallets: ["6WxofD4zk33GoMdFdPHaDsdyTwhNwJVWJVMTgnqWs6to"],
    email: "jane.smith@example.com",
  },
  {
    id: "GCqCqmBrXuhsA9QypAXLxcA3GCpcWXnQmajvMah9ZDBD",
    name: "Bob Wilson",
    title: "UI Designer",
    employmentType: "Part Time",
    walletAddress: "GCqCqmBrXuhsA9QypAXLxcA3GCpcWXnQmajvMah9ZDBD",
    additionalWallets: [],
    email: "bob.wilson@example.com",
  },
];
