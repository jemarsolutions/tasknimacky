import { db } from "@/db/drizzle";
import { project } from "@/db/schema";
import { auth } from "@/lib/auth";
import { and, eq } from "drizzle-orm";
import { headers } from "next/headers";

export async function getProjectsById(id: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user.id) return [];
  const allProjects = await db
    .select()
    .from(project)
    .where(and(eq(project.id, id), eq(project.userId, session?.user.id)));
  return allProjects;
}
