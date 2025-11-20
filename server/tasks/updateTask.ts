"use server";
import { db } from "@/db/drizzle";
import { task } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function updateTask(formData: FormData) {
  const taskId = formData.get("taskId") as string;
  const due_date = formData.get("due_date") as string;
  const priority = formData.get("priority") as string;
  const status = formData.get("status") as string;

  await db
    .update(task)
    .set({ due_date: due_date, priority: priority, status: status })
    .where(eq(task.id, taskId));

  revalidatePath("/tasks/");
}
