export interface Task {
  id: string;
  title: string;
  description: string;
  due_date: string;
  priority: string;
  status: string;
}

// export const task = pgTable("task", {
//   id: uuid("id").primaryKey().defaultRandom(),
//   projectId: uuid("projectId")
//     .notNull()
//     .references(() => project.id, { onDelete: "cascade" }),
//   title: text("title").notNull(),
//   description: text("description").notNull(),
//   due_date: text("due_date").notNull(),
//   priority: text("priority").notNull(),
//   status: text("status").notNull(),
//   created_at: timestamp("created_at").defaultNow().notNull(),
//   updated_at: timestamp("updated_at")
//     .defaultNow()
//     .$onUpdate(() => /* @__PURE__ */ new Date())
//     .notNull(),
// });
