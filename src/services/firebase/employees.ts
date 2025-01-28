import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  DocumentData,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

const COLLECTION_NAME = "employees";

export interface Employee {
  id: string; // wallet address
  name: string;
  title: string;
  employmentType: string;
  walletAddress: string; // primary wallet address
  additionalWallets: string[]; // additional wallet addresses for payments
  email: string;
  status: "active" | "inactive";
  dateAdded: string; // ISO date string
  estimatedSalary: number; // yearly salary
  employerNotes?: string; // optional notes about the employee
}

export const employeesCollection = collection(db, COLLECTION_NAME);

// Get all employees
export const getAllEmployees = async (): Promise<Employee[]> => {
  const snapshot = await getDocs(employeesCollection);
  return snapshot.docs.map((doc) => ({
    ...doc.data(),
  })) as Employee[];
};

// Get employee by wallet address (id)
export const getEmployeeByWallet = async (
  walletAddress: string
): Promise<Employee | null> => {
  const docRef = doc(db, COLLECTION_NAME, walletAddress);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    return null;
  }

  return docSnap.data() as Employee;
};

// Add new employee (using wallet address as document ID)
export const addEmployee = async (employee: Employee): Promise<void> => {
  const docRef = doc(db, COLLECTION_NAME, employee.walletAddress);
  await setDoc(docRef, {
    ...employee,
    dateAdded: employee.dateAdded || new Date().toISOString(),
    status: employee.status || "active",
  });
};

// Update employee
export const updateEmployee = async (
  walletAddress: string,
  data: Partial<Employee>
): Promise<void> => {
  const docRef = doc(db, COLLECTION_NAME, walletAddress);
  await updateDoc(docRef, data);
};

// Delete employee
export const deleteEmployee = async (walletAddress: string): Promise<void> => {
  const docRef = doc(db, COLLECTION_NAME, walletAddress);
  await deleteDoc(docRef);
};

// Get employees by employment type
export const getEmployeesByType = async (
  employmentType: string
): Promise<Employee[]> => {
  const q = query(
    employeesCollection,
    where("employmentType", "==", employmentType)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    ...doc.data(),
  })) as Employee[];
};

// Get employees by status
export const getEmployeesByStatus = async (
  status: "active" | "inactive"
): Promise<Employee[]> => {
  const q = query(employeesCollection, where("status", "==", status));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    ...doc.data(),
  })) as Employee[];
};

// Get employees by salary range
export const getEmployeesBySalaryRange = async (
  min: number,
  max: number
): Promise<Employee[]> => {
  const q = query(
    employeesCollection,
    where("estimatedSalary", ">=", min),
    where("estimatedSalary", "<=", max)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    ...doc.data(),
  })) as Employee[];
};

// Get employees by title
export const getEmployeesByTitle = async (
  title: string
): Promise<Employee[]> => {
  const q = query(employeesCollection, where("title", "==", title));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    ...doc.data(),
  })) as Employee[];
};
