import { onchainTable } from "ponder";
import { relations } from "ponder";

// Data requirement:
// Tx Hash
// From (address)
// To (address)
// Amount
// Timestamp
// Block number

export const token = onchainTable("token", (t) => ({
  id: t.text().primaryKey(),
  address: t.text().notNull(),
  name: t.text().notNull(),
  symbol: t.text().notNull(),
  decimals: t.integer().notNull(),
}));

export const tokenRelations = relations(token, ({ many }) => ({
  transfers: many(transfer),
}));

export const transfer = onchainTable("transfer", (t) => ({
  id: t.text().primaryKey(),
  txHash: t.text().notNull(),
  from: t.text().notNull(),
  to: t.text().notNull(),
  amount: t.bigint().notNull(),
  timestamp: t.bigint().notNull(),
  blocknumber: t.bigint().notNull(),
  tokenId: t.text().notNull(),
}));

export const transferRelations = relations(transfer, ({ one }) => ({
  token: one(token, { fields: [transfer.tokenId], references: [token.id] }),
}));

export const holder = onchainTable("holder", (t) => ({
  id: t.text().primaryKey(),
  address: t.text().notNull(),
  balance: t.bigint().notNull(),
}));

