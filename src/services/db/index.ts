import { Typesaurus, schema } from "typesaurus";

export interface Organization {
  name: string;
  walletAddress: string;
  recoveryAddress?: string;
}

export interface Employee {
  name: string;
  title: string;
  employmentType: string;
  walletAddress: string;
  additionalWallets: string[];
  email: string;
  status: boolean;
  estimatedSalary: number;
  employerNotes: string;
  organizationId: string;
}

export const db = schema(($) => ({
  organizations: $.collection<Organization>().sub({
    employees: $.collection<Employee>(),
  }),
}));

export type Schema = Typesaurus.Schema<typeof db>;

export type SchemaKeys = keyof Schema;
export type SubSchemas = Schema[SchemaKeys]["sub"];
export type SubSchemaKeys = keyof SubSchemas;
export type Document = Schema[SchemaKeys]["Doc"];
export type SubDocument = SubSchemas[SubSchemaKeys]["Doc"];

export type Result<T> = {
  id: string;
} & T & {
    exist: boolean;
  };

export function toResult<U>(doc: Document | SubDocument | null): Result<U> {
  return { id: doc?.ref?.id as string, ...(doc?.data as U), exist: !!doc };
}
