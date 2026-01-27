import { relations, sql } from 'drizzle-orm';
import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';

// Expenses Table
export const expenses = sqliteTable('expenses', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  description: text('description').notNull(),
  amount: real('amount').notNull(),
  category: text('category').default('unassigned').notNull(),
  billType: text('bill_type').notNull(),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
  updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
});

export const expensesRelations = relations(expenses, ({ many }) => ({
  reports: many(monthlyReports),
}));

// Monthly Reports Table
export const monthlyReports = sqliteTable('monthlyReports', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  monthNumber: text('monthNumber').notNull(),
  expenseId: integer('expenseId').notNull().references(() => expenses.id, { onDelete: 'cascade' }),
});

export const monthlyReportsRelations = relations(monthlyReports, ({ one }) => ({
  expense: one(expenses, {
    fields: [monthlyReports.expenseId],
    references: [expenses.id],
  }),
}));