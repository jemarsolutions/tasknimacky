"use server";
import { db } from "@/db/drizzle";
import { task } from "@/db/schema";
import { revalidatePath } from "next/cache";

export async function addTask(formData: FormData) {
  const projectId = formData.get("projectId") as string;
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const due_date = formData.get("due_date") as string;
  const priority = formData.get("priority") as string;
  const status = formData.get("status") as string;

  await db
    .insert(task)
    .values({ projectId, title, description, due_date, priority, status });

  revalidatePath("/");
}
