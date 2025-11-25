"use server";
import { db } from "@/db/drizzle";
import { project, task } from "@/db/schema";
import { desc, eq, ilike, and } from "drizzle-orm";
import { unstable_cache } from "next/cache";
import { Task } from "@/components/shared/types";

export async function getAllTasks(id: string) {
  const allTasks = await db
    .select()
    .from(task)
    .where(eq(task.projectId, id))
    .orderBy(desc(task.created_at));
  return allTasks;
}

export const getAllTasksForSearch = unstable_cache(
  async (search: string, session): Promise<Task[]> => {
    const rows = await db
      .select()
      .from(task)
      .leftJoin(project, eq(project.id, task.projectId))
      .where(
        and(
          ilike(task.title, `%${search}%`),
          eq(project.userId, session.user.id || "")
        )
      )
      .orderBy(desc(task.created_at));

    // Map joined rows to the Task shape by extracting the task property
    const tasks: Task[] = (rows as any[]).map((r) => r.task);
    return tasks;
  },
  ["tasks"],
  { tags: ["tasks"] }
);
