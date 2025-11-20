import { db } from "@/db/drizzle";
import { task } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { getAllProjects } from "../projects/getProjects";

export async function getAllTasks(id: string) {
  const projectsData = await getAllProjects();
  if (!projectsData || projectsData.length === 0) {
    return [];
  }
  const allTasks = await db
    .select()
    .from(task)
    .where(eq(task.projectId, id))
    .orderBy(desc(task.created_at));
  return allTasks;
}
