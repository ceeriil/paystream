import { DicebearAvatar } from "../ui/dicebear-avatar";
import Link from "next/link";

const topPaidEmployees = [
  {
    name: "Cody Fisher",
    company: "Louis Vuitton",
    salary: "$12,500",
    date: "1 Jun 2022",
  },
  {
    name: "Esther Howard",
    company: "Starbucks",
    salary: "$11,800",
    date: "1 May 2022",
  },
  {
    name: "Wade Warren",
    company: "Louis Vuitton",
    salary: "$10,750",
    date: "1 Apr 2022",
  },
  {
    name: "Brooklyn Simmons",
    company: "Sony",
    salary: "$9,900",
    date: "1 Mar 2022",
  },
  {
    name: "Ralph Edwards",
    company: "IBM",
    salary: "$9,500",
    date: "1 Feb 2022",
  },
  {
    name: "Dianne Russell",
    company: "Disney",
    salary: "$9,200",
    date: "1 Jan 2022",
  },
  {
    name: "Dianne Russell",
    company: "Disney",
    salary: "$9,200",
    date: "1 Jan 2022",
  },
];

const TopPaidEmployees = () => {
  return (
    <div className="p-6 rounded-xl shadow-lg max-w-md mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Top Paid Employees</h2>
        <Link
          href="/dashboard/employees"
          className="text-blue-600 dark:text-blue-400 text-sm font-medium">
          See All
        </Link>
      </div>

      <ul className="space-y-4">
        {topPaidEmployees.map((employee, index) => (
          <li key={index} className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
              <DicebearAvatar
                seed={employee.name}
                size={60}
                className="w-10 h-10  rounded-full"
              />
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {employee.name}
                </p>
                <p className="text-xs">{employee.company}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold">{employee.salary}</p>
              <p className="text-xs">{employee.date}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopPaidEmployees;
