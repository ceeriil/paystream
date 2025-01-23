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
    id: "0x1234...5678",
    name: "John Doe",
    title: "Senior Developer",
    employmentType: "Full Time",
    walletAddress: "0x1234...5678",
    additionalWallets: ["0xabcd...efgh", "0x9012...3456"],
    email: "john.doe@example.com",
  },
  {
    id: "0x8765...4321",
    name: "Jane Smith",
    title: "Product Manager",
    employmentType: "Full Time",
    walletAddress: "0x8765...4321",
    additionalWallets: ["0xijkl...mnop"],
    email: "jane.smith@example.com",
  },
  {
    id: "0x9876...1234",
    name: "Bob Wilson",
    title: "UI Designer",
    employmentType: "Part Time",
    walletAddress: "0x9876...1234",
    additionalWallets: [],
    email: "bob.wilson@example.com",
  },
];
