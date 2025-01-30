import { Result, Schema, db, toResult } from "@/services/db";

export interface Organization {
  name: string;
  walletAddress: string
  recoveryAddress?: string
}


export type OrganizationDoc = Schema["organizations"]["Doc"];
export type OrganizationResult = Result<Organization>;


export async function findAllOrganizations(): Promise<OrganizationResult[]> {
  const organizationsSnaphot = await db.organizations.all();
   const organizations = organizationsSnaphot.map(employee => toResult<Organization>(employee));
   return organizations;
 }

export async function findOrganization(address: string): Promise<OrganizationResult> {
  const organizationSnapshot = await db.organizations.get(db.organizations.id(address));
  return toResult<Organization>(organizationSnapshot);
}

export async function createOrganization(
  name: string,
  walletAddress: string
): Promise<OrganizationResult> {
  const organizationAddress = db.organizations.id(walletAddress);
  const ref = await db.organizations.set(organizationAddress, () => ({
    name, walletAddress: walletAddress
  }));
  const userSnapshot = await db.organizations.get(ref.id);
  return toResult<Organization>(userSnapshot);
}


export async function updateOrganization(
   name: string,
  walletAddress: string
): Promise<OrganizationResult> {
  const organizationSnapshot = await db.organizations.get(db.organizations.id(walletAddress));
  await organizationSnapshot?.ref?.update(() => ({
    name, walletAddress: walletAddress
  }));
  return toResult<Organization>(organizationSnapshot);
}