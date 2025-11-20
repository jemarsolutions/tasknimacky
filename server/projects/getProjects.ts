import { db } from "@/db/drizzle";
import { project } from "@/db/schema";
import { auth } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";

export async function getAllProjects() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user.id) return [];
  const userId = session?.user.id;
  const allProjects = await db
    .select()
    .from(project)
    .where(eq(project.userId, userId));
  return allProjects;
}
