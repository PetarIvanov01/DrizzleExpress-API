CREATE TABLE IF NOT EXISTS "order_info" (
	"order_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"price" numeric NOT NULL,
	"status_id" integer DEFAULT 1,
	"order_date" timestamp with time zone DEFAULT '2024-03-30T10:35:47.381Z' NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "order_product_info" (
	"_id" serial PRIMARY KEY NOT NULL,
	"order_id" uuid NOT NULL,
	"product_id" uuid NOT NULL,
	"quantity" integer NOT NULL,
	"subototal" numeric NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "order_status" (
	"status_id" serial PRIMARY KEY NOT NULL,
	"status_name" varchar(50)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_order_address" (
	"_id" serial PRIMARY KEY NOT NULL,
	"order_id" uuid NOT NULL,
	"country" varchar(100) NOT NULL,
	"city" varchar(100) NOT NULL,
	"address" text NOT NULL,
	"postcode" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_order_personal_info" (
	"_id" serial PRIMARY KEY NOT NULL,
	"full_name" varchar(255) NOT NULL,
	"phone_number" varchar(50) NOT NULL,
	"order_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "categories" (
	"category_id" serial PRIMARY KEY NOT NULL,
	"type" varchar(50) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "products" (
	"product_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"category_id" integer NOT NULL,
	"title" varchar(150) NOT NULL,
	"price" numeric NOT NULL,
	"description" text NOT NULL,
	"image" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"type" varchar(50) DEFAULT 'user' NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	"created_at" timestamp with time zone DEFAULT '2024-03-30T10:35:47.380Z' NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_address" (
	"address_id" serial PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"country" varchar(100),
	"city" varchar(100),
	"address" text,
	"postcode" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_profile" (
	"profile_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"first_name" varchar(100) NOT NULL,
	"last_name" varchar(100) NOT NULL,
	"phone_number" varchar(50) NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "order_info" ADD CONSTRAINT "order_info_user_id_user_profile_profile_id_fk" FOREIGN KEY ("user_id") REFERENCES "user_profile"("profile_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "order_info" ADD CONSTRAINT "order_info_status_id_order_status_status_id_fk" FOREIGN KEY ("status_id") REFERENCES "order_status"("status_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "order_product_info" ADD CONSTRAINT "order_product_info_order_id_order_info_order_id_fk" FOREIGN KEY ("order_id") REFERENCES "order_info"("order_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "order_product_info" ADD CONSTRAINT "order_product_info_product_id_products_product_id_fk" FOREIGN KEY ("product_id") REFERENCES "products"("product_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_order_address" ADD CONSTRAINT "user_order_address_order_id_order_info_order_id_fk" FOREIGN KEY ("order_id") REFERENCES "order_info"("order_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_order_personal_info" ADD CONSTRAINT "user_order_personal_info_order_id_order_info_order_id_fk" FOREIGN KEY ("order_id") REFERENCES "order_info"("order_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "products" ADD CONSTRAINT "products_category_id_categories_category_id_fk" FOREIGN KEY ("category_id") REFERENCES "categories"("category_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_address" ADD CONSTRAINT "user_address_user_id_user_profile_profile_id_fk" FOREIGN KEY ("user_id") REFERENCES "user_profile"("profile_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_profile" ADD CONSTRAINT "user_profile_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
