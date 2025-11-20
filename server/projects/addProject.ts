"use server";
import { db } from "@/db/drizzle";
import { project } from "@/db/schema";
import { revalidatePath } from "next/cache";

export async function addProject(formData: FormData) {
  const userId = formData.get("userId") as string;
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;

  await db.insert(project).values({ userId, title, description });

  revalidatePath("/");
}
