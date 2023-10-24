import { serial, varchar, pgTable, integer, primaryKey, timestamp } from "drizzle-orm/pg-core"

export const usserAcc = pgTable('user_accounts', {
    userId: serial('user_id').primaryKey(),
    email: varchar('email', { length: 150 }).notNull(),
    username: varchar('name', { length: 150 }).notNull(),
    password: varchar('password', { length: 150 }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).default(new Date()).notNull()
});

export const game = pgTable('game', {
    gameId: serial('game_id').primaryKey(),
    category: varchar('category', { length: 20 }).notNull()
});

export const level = pgTable('level', {
    levelId: serial('level_id').primaryKey(),
    name: varchar('name', { length: 20 }).notNull(),
    gameId: integer('game_id').references(() => usserAcc.userId),
});

export const userGame = pgTable('user_game', {
    userId: integer('user_id').references(() => usserAcc.userId),
    gameId: integer('game_id').references(() => game.gameId),
    levelId: integer('level_id').references(() => level.levelId),
    totalAnswers: integer('total_answers').notNull(),
    correctAnswers: integer('correct_answers').notNull(),
}, (table) => {
    return {
        pk: primaryKey(table.userId, table.gameId, table.levelId)
    }
});

// export const gameSessions = pgTable('game_sessions', {
//     id: serial('id').primaryKey(),
//     userId: integer('user_id').references(() => usserAcc.userId),
//     gameId: integer('game_id').references(() => game.gameId)
//   });