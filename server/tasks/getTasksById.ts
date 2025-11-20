import { db } from "@/db/drizzle";
import { task } from "@/db/schema";
import { and, eq } from "drizzle-orm";

export async function getTasksById(id: string) {
  const allTasks = await db.select().from(task).where(eq(task.id, id));
  return allTasks;
}
