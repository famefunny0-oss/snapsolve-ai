import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  isGuest: boolean("is_guest").default(false),
});

export const insertUserSchema = createInsertSchema(users);
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

// Basic history of solved questions
export const questions = pgTable("questions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id"), // Can be null for guests if we don't track them, or we can track by session
  content: text("content"),
  imageUrl: text("image_url"),
  subject: text("subject").notNull(),
  classLevel: text("class_level").notNull(),
  solution: text("solution").notNull(),
  createdAt: text("created_at").default("NOW()"),
});

export const insertQuestionSchema = createInsertSchema(questions).omit({ id: true, createdAt: true });
export type Question = typeof questions.$inferSelect;
export type InsertQuestion = z.infer<typeof insertQuestionSchema>;
