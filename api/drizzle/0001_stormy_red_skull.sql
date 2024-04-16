ALTER TABLE "order_info" ALTER COLUMN "order_date" SET DEFAULT '2024-04-02T11:35:31.941Z';--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "created_at" SET DEFAULT '2024-04-02T11:35:31.940Z';--> statement-breakpoint
ALTER TABLE "order_info" ADD COLUMN "order_desc" text;