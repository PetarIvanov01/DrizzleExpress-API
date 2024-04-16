ALTER TABLE "order_info" DROP CONSTRAINT "order_info_user_id_user_profile_profile_id_fk";
--> statement-breakpoint
ALTER TABLE "order_product_info" DROP CONSTRAINT "order_product_info_order_id_order_info_order_id_fk";
--> statement-breakpoint
ALTER TABLE "user_order_address" DROP CONSTRAINT "user_order_address_order_id_order_info_order_id_fk";
--> statement-breakpoint
ALTER TABLE "user_order_personal_info" DROP CONSTRAINT "user_order_personal_info_order_id_order_info_order_id_fk";
--> statement-breakpoint
ALTER TABLE "products" DROP CONSTRAINT "products_category_id_categories_category_id_fk";
--> statement-breakpoint
ALTER TABLE "user_address" DROP CONSTRAINT "user_address_user_id_user_profile_profile_id_fk";
--> statement-breakpoint
ALTER TABLE "user_profile" DROP CONSTRAINT "user_profile_user_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "order_info" ALTER COLUMN "order_date" SET DEFAULT '2024-04-09T12:30:49.782Z';--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "created_at" SET DEFAULT '2024-04-09T12:30:49.781Z';--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "order_info" ADD CONSTRAINT "order_info_user_id_user_profile_profile_id_fk" FOREIGN KEY ("user_id") REFERENCES "user_profile"("profile_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "order_product_info" ADD CONSTRAINT "order_product_info_order_id_order_info_order_id_fk" FOREIGN KEY ("order_id") REFERENCES "order_info"("order_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_order_address" ADD CONSTRAINT "user_order_address_order_id_order_info_order_id_fk" FOREIGN KEY ("order_id") REFERENCES "order_info"("order_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_order_personal_info" ADD CONSTRAINT "user_order_personal_info_order_id_order_info_order_id_fk" FOREIGN KEY ("order_id") REFERENCES "order_info"("order_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "products" ADD CONSTRAINT "products_category_id_categories_category_id_fk" FOREIGN KEY ("category_id") REFERENCES "categories"("category_id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_address" ADD CONSTRAINT "user_address_user_id_user_profile_profile_id_fk" FOREIGN KEY ("user_id") REFERENCES "user_profile"("profile_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_profile" ADD CONSTRAINT "user_profile_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
