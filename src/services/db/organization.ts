import { Result, db, toResult } from "@/services/db";
import { Organization } from "@/services/db";

export async function findAllOrganizations(): Promise<Result<Organization>[]> {
  const organizationsSnapshot = await db.organizations.all();
  const organizations = organizationsSnapshot.map((org) =>
    toResult<Organization>(org),
  );
  return organizations;
}

export async function findOrganization(
  address: string,
): Promise<Result<Organization>> {
  const organizationSnapshot = await db.organizations.get(
    db.organizations.id(address),
  );
  return toResult<Organization>(organizationSnapshot);
}

export async function createOrganization(
  name: string,
  walletAddress: string,
): Promise<Result<Organization>> {
  const organizationAddress = db.organizations.id(walletAddress);
  const ref = await db.organizations.set(organizationAddress, () => ({
    name,
    walletAddress: walletAddress,
  }));
  const organizationSnapshot = await db.organizations.get(ref.id);
  return toResult<Organization>(organizationSnapshot);
}

export async function updateOrganization(
  name: string,
  walletAddress: string,
): Promise<Result<Organization>> {
  const organizationSnapshot = await db.organizations.get(
    db.organizations.id(walletAddress),
  );
  await organizationSnapshot?.ref?.update(() => ({
    name,
    walletAddress: walletAddress,
  }));
  return toResult<Organization>(organizationSnapshot);
}
