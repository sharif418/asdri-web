import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_people_roles" AS ENUM('leadership', 'faculty', 'staff', 'author');
  CREATE TYPE "public"."enum_people_teams" AS ENUM('core', 'arabic', 'tajweed', 'tarbiyah', 'english', 'bangla', 'computer', 'math', 'science');
  CREATE TYPE "public"."enum_people_social_platform" AS ENUM('facebook', 'youtube', 'x', 'linkedin', 'website');
  CREATE TYPE "public"."enum_people_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__people_v_version_roles" AS ENUM('leadership', 'faculty', 'staff', 'author');
  CREATE TYPE "public"."enum__people_v_version_teams" AS ENUM('core', 'arabic', 'tajweed', 'tarbiyah', 'english', 'bangla', 'computer', 'math', 'science');
  CREATE TYPE "public"."enum__people_v_version_social_platform" AS ENUM('facebook', 'youtube', 'x', 'linkedin', 'website');
  CREATE TYPE "public"."enum__people_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__people_v_published_locale" AS ENUM('bn', 'en');
  CREATE TABLE "people_roles" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_people_roles",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "people_teams" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_people_teams",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "people_subjects" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "people_subjects_locales" (
  	"subject" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "people_social" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"platform" "enum_people_social_platform",
  	"url" varchar
  );
  
  CREATE TABLE "people" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"photo_id" integer,
  	"email" varchar,
  	"phone" varchar,
  	"featured_on_home" boolean DEFAULT false,
  	"order" numeric DEFAULT 0,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_people_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "people_locales" (
  	"name" varchar,
  	"designation" varchar,
  	"bio" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_people_v_version_roles" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__people_v_version_roles",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_people_v_version_teams" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__people_v_version_teams",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_people_v_version_subjects" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_people_v_version_subjects_locales" (
  	"subject" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_people_v_version_social" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"platform" "enum__people_v_version_social_platform",
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_people_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_photo_id" integer,
  	"version_email" varchar,
  	"version_phone" varchar,
  	"version_featured_on_home" boolean DEFAULT false,
  	"version_order" numeric DEFAULT 0,
  	"version_generate_slug" boolean DEFAULT true,
  	"version_slug" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__people_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__people_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_people_v_locales" (
  	"version_name" varchar,
  	"version_designation" varchar,
  	"version_bio" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "people_id" integer;
  ALTER TABLE "people_roles" ADD CONSTRAINT "people_roles_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."people"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "people_teams" ADD CONSTRAINT "people_teams_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."people"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "people_subjects" ADD CONSTRAINT "people_subjects_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."people"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "people_subjects_locales" ADD CONSTRAINT "people_subjects_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."people_subjects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "people_social" ADD CONSTRAINT "people_social_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."people"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "people" ADD CONSTRAINT "people_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "people_locales" ADD CONSTRAINT "people_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."people"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_people_v_version_roles" ADD CONSTRAINT "_people_v_version_roles_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_people_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_people_v_version_teams" ADD CONSTRAINT "_people_v_version_teams_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_people_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_people_v_version_subjects" ADD CONSTRAINT "_people_v_version_subjects_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_people_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_people_v_version_subjects_locales" ADD CONSTRAINT "_people_v_version_subjects_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_people_v_version_subjects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_people_v_version_social" ADD CONSTRAINT "_people_v_version_social_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_people_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_people_v" ADD CONSTRAINT "_people_v_parent_id_people_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."people"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_people_v" ADD CONSTRAINT "_people_v_version_photo_id_media_id_fk" FOREIGN KEY ("version_photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_people_v_locales" ADD CONSTRAINT "_people_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_people_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "people_roles_order_idx" ON "people_roles" USING btree ("order");
  CREATE INDEX "people_roles_parent_idx" ON "people_roles" USING btree ("parent_id");
  CREATE INDEX "people_teams_order_idx" ON "people_teams" USING btree ("order");
  CREATE INDEX "people_teams_parent_idx" ON "people_teams" USING btree ("parent_id");
  CREATE INDEX "people_subjects_order_idx" ON "people_subjects" USING btree ("_order");
  CREATE INDEX "people_subjects_parent_id_idx" ON "people_subjects" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "people_subjects_locales_locale_parent_id_unique" ON "people_subjects_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "people_social_order_idx" ON "people_social" USING btree ("_order");
  CREATE INDEX "people_social_parent_id_idx" ON "people_social" USING btree ("_parent_id");
  CREATE INDEX "people_photo_idx" ON "people" USING btree ("photo_id");
  CREATE UNIQUE INDEX "people_slug_idx" ON "people" USING btree ("slug");
  CREATE INDEX "people_updated_at_idx" ON "people" USING btree ("updated_at");
  CREATE INDEX "people_created_at_idx" ON "people" USING btree ("created_at");
  CREATE INDEX "people__status_idx" ON "people" USING btree ("_status");
  CREATE UNIQUE INDEX "people_locales_locale_parent_id_unique" ON "people_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_people_v_version_roles_order_idx" ON "_people_v_version_roles" USING btree ("order");
  CREATE INDEX "_people_v_version_roles_parent_idx" ON "_people_v_version_roles" USING btree ("parent_id");
  CREATE INDEX "_people_v_version_teams_order_idx" ON "_people_v_version_teams" USING btree ("order");
  CREATE INDEX "_people_v_version_teams_parent_idx" ON "_people_v_version_teams" USING btree ("parent_id");
  CREATE INDEX "_people_v_version_subjects_order_idx" ON "_people_v_version_subjects" USING btree ("_order");
  CREATE INDEX "_people_v_version_subjects_parent_id_idx" ON "_people_v_version_subjects" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_people_v_version_subjects_locales_locale_parent_id_unique" ON "_people_v_version_subjects_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_people_v_version_social_order_idx" ON "_people_v_version_social" USING btree ("_order");
  CREATE INDEX "_people_v_version_social_parent_id_idx" ON "_people_v_version_social" USING btree ("_parent_id");
  CREATE INDEX "_people_v_parent_idx" ON "_people_v" USING btree ("parent_id");
  CREATE INDEX "_people_v_version_version_photo_idx" ON "_people_v" USING btree ("version_photo_id");
  CREATE INDEX "_people_v_version_version_slug_idx" ON "_people_v" USING btree ("version_slug");
  CREATE INDEX "_people_v_version_version_updated_at_idx" ON "_people_v" USING btree ("version_updated_at");
  CREATE INDEX "_people_v_version_version_created_at_idx" ON "_people_v" USING btree ("version_created_at");
  CREATE INDEX "_people_v_version_version__status_idx" ON "_people_v" USING btree ("version__status");
  CREATE INDEX "_people_v_created_at_idx" ON "_people_v" USING btree ("created_at");
  CREATE INDEX "_people_v_updated_at_idx" ON "_people_v" USING btree ("updated_at");
  CREATE INDEX "_people_v_snapshot_idx" ON "_people_v" USING btree ("snapshot");
  CREATE INDEX "_people_v_published_locale_idx" ON "_people_v" USING btree ("published_locale");
  CREATE INDEX "_people_v_latest_idx" ON "_people_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_people_v_locales_locale_parent_id_unique" ON "_people_v_locales" USING btree ("_locale","_parent_id");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_people_fk" FOREIGN KEY ("people_id") REFERENCES "public"."people"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_people_id_idx" ON "payload_locked_documents_rels" USING btree ("people_id");
  ALTER TABLE "media" DROP COLUMN "_objectkey";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "people_roles" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "people_teams" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "people_subjects" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "people_subjects_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "people_social" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "people" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "people_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_people_v_version_roles" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_people_v_version_teams" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_people_v_version_subjects" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_people_v_version_subjects_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_people_v_version_social" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_people_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_people_v_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "people_roles" CASCADE;
  DROP TABLE "people_teams" CASCADE;
  DROP TABLE "people_subjects" CASCADE;
  DROP TABLE "people_subjects_locales" CASCADE;
  DROP TABLE "people_social" CASCADE;
  DROP TABLE "people" CASCADE;
  DROP TABLE "people_locales" CASCADE;
  DROP TABLE "_people_v_version_roles" CASCADE;
  DROP TABLE "_people_v_version_teams" CASCADE;
  DROP TABLE "_people_v_version_subjects" CASCADE;
  DROP TABLE "_people_v_version_subjects_locales" CASCADE;
  DROP TABLE "_people_v_version_social" CASCADE;
  DROP TABLE "_people_v" CASCADE;
  DROP TABLE "_people_v_locales" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_people_fk";
  
  DROP INDEX "payload_locked_documents_rels_people_id_idx";
  ALTER TABLE "media" ADD COLUMN "_objectkey" varchar;
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "people_id";
  DROP TYPE "public"."enum_people_roles";
  DROP TYPE "public"."enum_people_teams";
  DROP TYPE "public"."enum_people_social_platform";
  DROP TYPE "public"."enum_people_status";
  DROP TYPE "public"."enum__people_v_version_roles";
  DROP TYPE "public"."enum__people_v_version_teams";
  DROP TYPE "public"."enum__people_v_version_social_platform";
  DROP TYPE "public"."enum__people_v_version_status";
  DROP TYPE "public"."enum__people_v_published_locale";`)
}
