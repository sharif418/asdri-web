import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "home_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"video_url" varchar,
  	"poster_image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "home_blocks_hero_locales" (
  	"heading" varchar NOT NULL,
  	"tagline" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "home_blocks_impact_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"block_name" varchar
  );
  
  CREATE TABLE "home_blocks_impact_stats_locales" (
  	"heading" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "home_blocks_vision_pillars" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "home_blocks_vision_pillars_locales" (
  	"title" varchar NOT NULL,
  	"body" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "home_blocks_vision" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"block_name" varchar
  );
  
  CREATE TABLE "home_blocks_vision_locales" (
  	"heading" varchar NOT NULL,
  	"statement" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "home_blocks_programmes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"block_name" varchar
  );
  
  CREATE TABLE "home_blocks_programmes_locales" (
  	"heading" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "home_blocks_refutations" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "home_blocks_refutations_locales" (
  	"heading" varchar NOT NULL,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "home_blocks_notices" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"limit" numeric DEFAULT 4,
  	"block_name" varchar
  );
  
  CREATE TABLE "home_blocks_notices_locales" (
  	"heading" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "home_blocks_campus_life_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer
  );
  
  CREATE TABLE "home_blocks_campus_life_items_locales" (
  	"title" varchar NOT NULL,
  	"body" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "home_blocks_campus_life" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"block_name" varchar
  );
  
  CREATE TABLE "home_blocks_campus_life_locales" (
  	"heading" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "home_blocks_media_hub" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "home_blocks_media_hub_locales" (
  	"heading" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "home_blocks_people" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"block_name" varchar
  );
  
  CREATE TABLE "home_blocks_people_locales" (
  	"heading" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "home_blocks_support" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"block_name" varchar
  );
  
  CREATE TABLE "home_blocks_support_locales" (
  	"heading" varchar NOT NULL,
  	"body" varchar,
  	"cta_label" varchar DEFAULT 'দান করুন',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "home_blocks_fatwa" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "home_blocks_fatwa_locales" (
  	"heading" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "home" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "home_blocks_hero" ADD CONSTRAINT "home_blocks_hero_poster_image_id_media_id_fk" FOREIGN KEY ("poster_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_blocks_hero" ADD CONSTRAINT "home_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_blocks_hero_locales" ADD CONSTRAINT "home_blocks_hero_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_blocks_impact_stats" ADD CONSTRAINT "home_blocks_impact_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_blocks_impact_stats_locales" ADD CONSTRAINT "home_blocks_impact_stats_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_blocks_impact_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_blocks_vision_pillars" ADD CONSTRAINT "home_blocks_vision_pillars_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_blocks_vision"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_blocks_vision_pillars_locales" ADD CONSTRAINT "home_blocks_vision_pillars_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_blocks_vision_pillars"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_blocks_vision" ADD CONSTRAINT "home_blocks_vision_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_blocks_vision_locales" ADD CONSTRAINT "home_blocks_vision_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_blocks_vision"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_blocks_programmes" ADD CONSTRAINT "home_blocks_programmes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_blocks_programmes_locales" ADD CONSTRAINT "home_blocks_programmes_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_blocks_programmes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_blocks_refutations" ADD CONSTRAINT "home_blocks_refutations_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_blocks_refutations_locales" ADD CONSTRAINT "home_blocks_refutations_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_blocks_refutations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_blocks_notices" ADD CONSTRAINT "home_blocks_notices_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_blocks_notices_locales" ADD CONSTRAINT "home_blocks_notices_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_blocks_notices"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_blocks_campus_life_items" ADD CONSTRAINT "home_blocks_campus_life_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_blocks_campus_life_items" ADD CONSTRAINT "home_blocks_campus_life_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_blocks_campus_life"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_blocks_campus_life_items_locales" ADD CONSTRAINT "home_blocks_campus_life_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_blocks_campus_life_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_blocks_campus_life" ADD CONSTRAINT "home_blocks_campus_life_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_blocks_campus_life_locales" ADD CONSTRAINT "home_blocks_campus_life_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_blocks_campus_life"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_blocks_media_hub" ADD CONSTRAINT "home_blocks_media_hub_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_blocks_media_hub_locales" ADD CONSTRAINT "home_blocks_media_hub_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_blocks_media_hub"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_blocks_people" ADD CONSTRAINT "home_blocks_people_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_blocks_people_locales" ADD CONSTRAINT "home_blocks_people_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_blocks_people"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_blocks_support" ADD CONSTRAINT "home_blocks_support_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_blocks_support_locales" ADD CONSTRAINT "home_blocks_support_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_blocks_support"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_blocks_fatwa" ADD CONSTRAINT "home_blocks_fatwa_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_blocks_fatwa_locales" ADD CONSTRAINT "home_blocks_fatwa_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_blocks_fatwa"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "home_blocks_hero_order_idx" ON "home_blocks_hero" USING btree ("_order");
  CREATE INDEX "home_blocks_hero_parent_id_idx" ON "home_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "home_blocks_hero_path_idx" ON "home_blocks_hero" USING btree ("_path");
  CREATE INDEX "home_blocks_hero_poster_image_idx" ON "home_blocks_hero" USING btree ("poster_image_id");
  CREATE UNIQUE INDEX "home_blocks_hero_locales_locale_parent_id_unique" ON "home_blocks_hero_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "home_blocks_impact_stats_order_idx" ON "home_blocks_impact_stats" USING btree ("_order");
  CREATE INDEX "home_blocks_impact_stats_parent_id_idx" ON "home_blocks_impact_stats" USING btree ("_parent_id");
  CREATE INDEX "home_blocks_impact_stats_path_idx" ON "home_blocks_impact_stats" USING btree ("_path");
  CREATE UNIQUE INDEX "home_blocks_impact_stats_locales_locale_parent_id_unique" ON "home_blocks_impact_stats_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "home_blocks_vision_pillars_order_idx" ON "home_blocks_vision_pillars" USING btree ("_order");
  CREATE INDEX "home_blocks_vision_pillars_parent_id_idx" ON "home_blocks_vision_pillars" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "home_blocks_vision_pillars_locales_locale_parent_id_unique" ON "home_blocks_vision_pillars_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "home_blocks_vision_order_idx" ON "home_blocks_vision" USING btree ("_order");
  CREATE INDEX "home_blocks_vision_parent_id_idx" ON "home_blocks_vision" USING btree ("_parent_id");
  CREATE INDEX "home_blocks_vision_path_idx" ON "home_blocks_vision" USING btree ("_path");
  CREATE UNIQUE INDEX "home_blocks_vision_locales_locale_parent_id_unique" ON "home_blocks_vision_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "home_blocks_programmes_order_idx" ON "home_blocks_programmes" USING btree ("_order");
  CREATE INDEX "home_blocks_programmes_parent_id_idx" ON "home_blocks_programmes" USING btree ("_parent_id");
  CREATE INDEX "home_blocks_programmes_path_idx" ON "home_blocks_programmes" USING btree ("_path");
  CREATE UNIQUE INDEX "home_blocks_programmes_locales_locale_parent_id_unique" ON "home_blocks_programmes_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "home_blocks_refutations_order_idx" ON "home_blocks_refutations" USING btree ("_order");
  CREATE INDEX "home_blocks_refutations_parent_id_idx" ON "home_blocks_refutations" USING btree ("_parent_id");
  CREATE INDEX "home_blocks_refutations_path_idx" ON "home_blocks_refutations" USING btree ("_path");
  CREATE UNIQUE INDEX "home_blocks_refutations_locales_locale_parent_id_unique" ON "home_blocks_refutations_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "home_blocks_notices_order_idx" ON "home_blocks_notices" USING btree ("_order");
  CREATE INDEX "home_blocks_notices_parent_id_idx" ON "home_blocks_notices" USING btree ("_parent_id");
  CREATE INDEX "home_blocks_notices_path_idx" ON "home_blocks_notices" USING btree ("_path");
  CREATE UNIQUE INDEX "home_blocks_notices_locales_locale_parent_id_unique" ON "home_blocks_notices_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "home_blocks_campus_life_items_order_idx" ON "home_blocks_campus_life_items" USING btree ("_order");
  CREATE INDEX "home_blocks_campus_life_items_parent_id_idx" ON "home_blocks_campus_life_items" USING btree ("_parent_id");
  CREATE INDEX "home_blocks_campus_life_items_image_idx" ON "home_blocks_campus_life_items" USING btree ("image_id");
  CREATE UNIQUE INDEX "home_blocks_campus_life_items_locales_locale_parent_id_uniqu" ON "home_blocks_campus_life_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "home_blocks_campus_life_order_idx" ON "home_blocks_campus_life" USING btree ("_order");
  CREATE INDEX "home_blocks_campus_life_parent_id_idx" ON "home_blocks_campus_life" USING btree ("_parent_id");
  CREATE INDEX "home_blocks_campus_life_path_idx" ON "home_blocks_campus_life" USING btree ("_path");
  CREATE UNIQUE INDEX "home_blocks_campus_life_locales_locale_parent_id_unique" ON "home_blocks_campus_life_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "home_blocks_media_hub_order_idx" ON "home_blocks_media_hub" USING btree ("_order");
  CREATE INDEX "home_blocks_media_hub_parent_id_idx" ON "home_blocks_media_hub" USING btree ("_parent_id");
  CREATE INDEX "home_blocks_media_hub_path_idx" ON "home_blocks_media_hub" USING btree ("_path");
  CREATE UNIQUE INDEX "home_blocks_media_hub_locales_locale_parent_id_unique" ON "home_blocks_media_hub_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "home_blocks_people_order_idx" ON "home_blocks_people" USING btree ("_order");
  CREATE INDEX "home_blocks_people_parent_id_idx" ON "home_blocks_people" USING btree ("_parent_id");
  CREATE INDEX "home_blocks_people_path_idx" ON "home_blocks_people" USING btree ("_path");
  CREATE UNIQUE INDEX "home_blocks_people_locales_locale_parent_id_unique" ON "home_blocks_people_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "home_blocks_support_order_idx" ON "home_blocks_support" USING btree ("_order");
  CREATE INDEX "home_blocks_support_parent_id_idx" ON "home_blocks_support" USING btree ("_parent_id");
  CREATE INDEX "home_blocks_support_path_idx" ON "home_blocks_support" USING btree ("_path");
  CREATE UNIQUE INDEX "home_blocks_support_locales_locale_parent_id_unique" ON "home_blocks_support_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "home_blocks_fatwa_order_idx" ON "home_blocks_fatwa" USING btree ("_order");
  CREATE INDEX "home_blocks_fatwa_parent_id_idx" ON "home_blocks_fatwa" USING btree ("_parent_id");
  CREATE INDEX "home_blocks_fatwa_path_idx" ON "home_blocks_fatwa" USING btree ("_path");
  CREATE UNIQUE INDEX "home_blocks_fatwa_locales_locale_parent_id_unique" ON "home_blocks_fatwa_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "home_blocks_hero" CASCADE;
  DROP TABLE "home_blocks_hero_locales" CASCADE;
  DROP TABLE "home_blocks_impact_stats" CASCADE;
  DROP TABLE "home_blocks_impact_stats_locales" CASCADE;
  DROP TABLE "home_blocks_vision_pillars" CASCADE;
  DROP TABLE "home_blocks_vision_pillars_locales" CASCADE;
  DROP TABLE "home_blocks_vision" CASCADE;
  DROP TABLE "home_blocks_vision_locales" CASCADE;
  DROP TABLE "home_blocks_programmes" CASCADE;
  DROP TABLE "home_blocks_programmes_locales" CASCADE;
  DROP TABLE "home_blocks_refutations" CASCADE;
  DROP TABLE "home_blocks_refutations_locales" CASCADE;
  DROP TABLE "home_blocks_notices" CASCADE;
  DROP TABLE "home_blocks_notices_locales" CASCADE;
  DROP TABLE "home_blocks_campus_life_items" CASCADE;
  DROP TABLE "home_blocks_campus_life_items_locales" CASCADE;
  DROP TABLE "home_blocks_campus_life" CASCADE;
  DROP TABLE "home_blocks_campus_life_locales" CASCADE;
  DROP TABLE "home_blocks_media_hub" CASCADE;
  DROP TABLE "home_blocks_media_hub_locales" CASCADE;
  DROP TABLE "home_blocks_people" CASCADE;
  DROP TABLE "home_blocks_people_locales" CASCADE;
  DROP TABLE "home_blocks_support" CASCADE;
  DROP TABLE "home_blocks_support_locales" CASCADE;
  DROP TABLE "home_blocks_fatwa" CASCADE;
  DROP TABLE "home_blocks_fatwa_locales" CASCADE;
  DROP TABLE "home" CASCADE;`)
}
