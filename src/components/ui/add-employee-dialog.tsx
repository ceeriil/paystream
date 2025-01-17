import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function AddEmployeeDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="btn-gradient px-4 py-3 rounded-xl font-medium text-sm text-white">
          Add Employee
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Employee</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Enter employee name" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" placeholder="Enter job title" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="type">Employment Type</Label>
            <Select>
              <SelectTrigger id="type">
                <SelectValue placeholder="Select employment type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="full-time">Full Time</SelectItem>
                <SelectItem value="part-time">Part Time</SelectItem>
                <SelectItem value="contract">Contract</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="wallet">Wallet Address</Label>
            <Input id="wallet" placeholder="Enter wallet address" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="Enter email address" />
          </div>
        </div>
        <div className="flex justify-end gap-3">
          <DialogTrigger asChild>
            <Button variant="outline">Cancel</Button>
          </DialogTrigger>
          <Button className="btn-gradient">Add Employee</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
