import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_categories_kind" AS ENUM('blog', 'fatwa', 'publication', 'download', 'faq', 'video');
  CREATE TYPE "public"."enum_faqs_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__faqs_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__faqs_v_published_locale" AS ENUM('bn', 'en');
  CREATE TYPE "public"."enum_downloads_category" AS ENUM('syllabus', 'form', 'dawah-material', 'prospectus', 'other');
  CREATE TYPE "public"."enum_downloads_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__downloads_v_version_category" AS ENUM('syllabus', 'form', 'dawah-material', 'prospectus', 'other');
  CREATE TYPE "public"."enum__downloads_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__downloads_v_published_locale" AS ENUM('bn', 'en');
  CREATE TYPE "public"."enum_alumni_batches_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__alumni_batches_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__alumni_batches_v_published_locale" AS ENUM('bn', 'en');
  CREATE TABLE "faqs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"category_id" integer,
  	"order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_faqs_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "faqs_locales" (
  	"question" varchar,
  	"answer" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_faqs_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_category_id" integer,
  	"version_order" numeric DEFAULT 0,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__faqs_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__faqs_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_faqs_v_locales" (
  	"version_question" varchar,
  	"version_answer" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "downloads" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"category" "enum_downloads_category",
  	"file_id" integer,
  	"course_id" integer,
  	"printable" boolean DEFAULT false,
  	"order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_downloads_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "downloads_locales" (
  	"title" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_downloads_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_category" "enum__downloads_v_version_category",
  	"version_file_id" integer,
  	"version_course_id" integer,
  	"version_printable" boolean DEFAULT false,
  	"version_order" numeric DEFAULT 0,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__downloads_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__downloads_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_downloads_v_locales" (
  	"version_title" varchar,
  	"version_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "alumni_batches" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"graduates" numeric,
  	"order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_alumni_batches_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "alumni_batches_locales" (
  	"programme" varchar,
  	"batch_label" varchar,
  	"note" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_alumni_batches_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_graduates" numeric,
  	"version_order" numeric DEFAULT 0,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__alumni_batches_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__alumni_batches_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_alumni_batches_v_locales" (
  	"version_programme" varchar,
  	"version_batch_label" varchar,
  	"version_note" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "about_content_objectives" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "about_content_objectives_locales" (
  	"value" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "about_content_facilities" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "about_content_facilities_locales" (
  	"title" varchar NOT NULL,
  	"body" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "about_content" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "about_content_locales" (
  	"vision_statement" varchar,
  	"alumni_intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "admissions_content_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "admissions_content_steps_locales" (
  	"title" varchar NOT NULL,
  	"body" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "admissions_content_scholarship_paragraphs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "admissions_content_scholarship_paragraphs_locales" (
  	"value" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "admissions_content" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "admissions_content_locales" (
  	"process_intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "categories" ADD COLUMN "kind" "enum_categories_kind" DEFAULT 'blog' NOT NULL;
  ALTER TABLE "categories" ADD COLUMN "order" numeric DEFAULT 0;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "faqs_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "downloads_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "alumni_batches_id" integer;
  ALTER TABLE "site_settings_locales" ADD COLUMN "admission_note" varchar;
  ALTER TABLE "home_blocks_campus_life_locales" ADD COLUMN "intro" varchar;
  ALTER TABLE "faqs" ADD CONSTRAINT "faqs_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "faqs_locales" ADD CONSTRAINT "faqs_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."faqs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_faqs_v" ADD CONSTRAINT "_faqs_v_parent_id_faqs_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."faqs"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_faqs_v" ADD CONSTRAINT "_faqs_v_version_category_id_categories_id_fk" FOREIGN KEY ("version_category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_faqs_v_locales" ADD CONSTRAINT "_faqs_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_faqs_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "downloads" ADD CONSTRAINT "downloads_file_id_media_id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "downloads" ADD CONSTRAINT "downloads_course_id_courses_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."courses"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "downloads_locales" ADD CONSTRAINT "downloads_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."downloads"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_downloads_v" ADD CONSTRAINT "_downloads_v_parent_id_downloads_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."downloads"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_downloads_v" ADD CONSTRAINT "_downloads_v_version_file_id_media_id_fk" FOREIGN KEY ("version_file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_downloads_v" ADD CONSTRAINT "_downloads_v_version_course_id_courses_id_fk" FOREIGN KEY ("version_course_id") REFERENCES "public"."courses"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_downloads_v_locales" ADD CONSTRAINT "_downloads_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_downloads_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "alumni_batches_locales" ADD CONSTRAINT "alumni_batches_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."alumni_batches"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_alumni_batches_v" ADD CONSTRAINT "_alumni_batches_v_parent_id_alumni_batches_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."alumni_batches"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_alumni_batches_v_locales" ADD CONSTRAINT "_alumni_batches_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_alumni_batches_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_content_objectives" ADD CONSTRAINT "about_content_objectives_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_content_objectives_locales" ADD CONSTRAINT "about_content_objectives_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_content_objectives"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_content_facilities" ADD CONSTRAINT "about_content_facilities_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_content_facilities_locales" ADD CONSTRAINT "about_content_facilities_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_content_facilities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_content_locales" ADD CONSTRAINT "about_content_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "admissions_content_steps" ADD CONSTRAINT "admissions_content_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."admissions_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "admissions_content_steps_locales" ADD CONSTRAINT "admissions_content_steps_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."admissions_content_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "admissions_content_scholarship_paragraphs" ADD CONSTRAINT "admissions_content_scholarship_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."admissions_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "admissions_content_scholarship_paragraphs_locales" ADD CONSTRAINT "admissions_content_scholarship_paragraphs_locales_parent__fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."admissions_content_scholarship_paragraphs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "admissions_content_locales" ADD CONSTRAINT "admissions_content_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."admissions_content"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "faqs_category_idx" ON "faqs" USING btree ("category_id");
  CREATE INDEX "faqs_updated_at_idx" ON "faqs" USING btree ("updated_at");
  CREATE INDEX "faqs_created_at_idx" ON "faqs" USING btree ("created_at");
  CREATE INDEX "faqs__status_idx" ON "faqs" USING btree ("_status");
  CREATE UNIQUE INDEX "faqs_locales_locale_parent_id_unique" ON "faqs_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_faqs_v_parent_idx" ON "_faqs_v" USING btree ("parent_id");
  CREATE INDEX "_faqs_v_version_version_category_idx" ON "_faqs_v" USING btree ("version_category_id");
  CREATE INDEX "_faqs_v_version_version_updated_at_idx" ON "_faqs_v" USING btree ("version_updated_at");
  CREATE INDEX "_faqs_v_version_version_created_at_idx" ON "_faqs_v" USING btree ("version_created_at");
  CREATE INDEX "_faqs_v_version_version__status_idx" ON "_faqs_v" USING btree ("version__status");
  CREATE INDEX "_faqs_v_created_at_idx" ON "_faqs_v" USING btree ("created_at");
  CREATE INDEX "_faqs_v_updated_at_idx" ON "_faqs_v" USING btree ("updated_at");
  CREATE INDEX "_faqs_v_snapshot_idx" ON "_faqs_v" USING btree ("snapshot");
  CREATE INDEX "_faqs_v_published_locale_idx" ON "_faqs_v" USING btree ("published_locale");
  CREATE INDEX "_faqs_v_latest_idx" ON "_faqs_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_faqs_v_locales_locale_parent_id_unique" ON "_faqs_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "downloads_file_idx" ON "downloads" USING btree ("file_id");
  CREATE INDEX "downloads_course_idx" ON "downloads" USING btree ("course_id");
  CREATE INDEX "downloads_updated_at_idx" ON "downloads" USING btree ("updated_at");
  CREATE INDEX "downloads_created_at_idx" ON "downloads" USING btree ("created_at");
  CREATE INDEX "downloads__status_idx" ON "downloads" USING btree ("_status");
  CREATE UNIQUE INDEX "downloads_locales_locale_parent_id_unique" ON "downloads_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_downloads_v_parent_idx" ON "_downloads_v" USING btree ("parent_id");
  CREATE INDEX "_downloads_v_version_version_file_idx" ON "_downloads_v" USING btree ("version_file_id");
  CREATE INDEX "_downloads_v_version_version_course_idx" ON "_downloads_v" USING btree ("version_course_id");
  CREATE INDEX "_downloads_v_version_version_updated_at_idx" ON "_downloads_v" USING btree ("version_updated_at");
  CREATE INDEX "_downloads_v_version_version_created_at_idx" ON "_downloads_v" USING btree ("version_created_at");
  CREATE INDEX "_downloads_v_version_version__status_idx" ON "_downloads_v" USING btree ("version__status");
  CREATE INDEX "_downloads_v_created_at_idx" ON "_downloads_v" USING btree ("created_at");
  CREATE INDEX "_downloads_v_updated_at_idx" ON "_downloads_v" USING btree ("updated_at");
  CREATE INDEX "_downloads_v_snapshot_idx" ON "_downloads_v" USING btree ("snapshot");
  CREATE INDEX "_downloads_v_published_locale_idx" ON "_downloads_v" USING btree ("published_locale");
  CREATE INDEX "_downloads_v_latest_idx" ON "_downloads_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_downloads_v_locales_locale_parent_id_unique" ON "_downloads_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "alumni_batches_updated_at_idx" ON "alumni_batches" USING btree ("updated_at");
  CREATE INDEX "alumni_batches_created_at_idx" ON "alumni_batches" USING btree ("created_at");
  CREATE INDEX "alumni_batches__status_idx" ON "alumni_batches" USING btree ("_status");
  CREATE UNIQUE INDEX "alumni_batches_locales_locale_parent_id_unique" ON "alumni_batches_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_alumni_batches_v_parent_idx" ON "_alumni_batches_v" USING btree ("parent_id");
  CREATE INDEX "_alumni_batches_v_version_version_updated_at_idx" ON "_alumni_batches_v" USING btree ("version_updated_at");
  CREATE INDEX "_alumni_batches_v_version_version_created_at_idx" ON "_alumni_batches_v" USING btree ("version_created_at");
  CREATE INDEX "_alumni_batches_v_version_version__status_idx" ON "_alumni_batches_v" USING btree ("version__status");
  CREATE INDEX "_alumni_batches_v_created_at_idx" ON "_alumni_batches_v" USING btree ("created_at");
  CREATE INDEX "_alumni_batches_v_updated_at_idx" ON "_alumni_batches_v" USING btree ("updated_at");
  CREATE INDEX "_alumni_batches_v_snapshot_idx" ON "_alumni_batches_v" USING btree ("snapshot");
  CREATE INDEX "_alumni_batches_v_published_locale_idx" ON "_alumni_batches_v" USING btree ("published_locale");
  CREATE INDEX "_alumni_batches_v_latest_idx" ON "_alumni_batches_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_alumni_batches_v_locales_locale_parent_id_unique" ON "_alumni_batches_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "about_content_objectives_order_idx" ON "about_content_objectives" USING btree ("_order");
  CREATE INDEX "about_content_objectives_parent_id_idx" ON "about_content_objectives" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "about_content_objectives_locales_locale_parent_id_unique" ON "about_content_objectives_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "about_content_facilities_order_idx" ON "about_content_facilities" USING btree ("_order");
  CREATE INDEX "about_content_facilities_parent_id_idx" ON "about_content_facilities" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "about_content_facilities_locales_locale_parent_id_unique" ON "about_content_facilities_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "about_content_locales_locale_parent_id_unique" ON "about_content_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "admissions_content_steps_order_idx" ON "admissions_content_steps" USING btree ("_order");
  CREATE INDEX "admissions_content_steps_parent_id_idx" ON "admissions_content_steps" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "admissions_content_steps_locales_locale_parent_id_unique" ON "admissions_content_steps_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "admissions_content_scholarship_paragraphs_order_idx" ON "admissions_content_scholarship_paragraphs" USING btree ("_order");
  CREATE INDEX "admissions_content_scholarship_paragraphs_parent_id_idx" ON "admissions_content_scholarship_paragraphs" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "admissions_content_scholarship_paragraphs_locales_locale_par" ON "admissions_content_scholarship_paragraphs_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "admissions_content_locales_locale_parent_id_unique" ON "admissions_content_locales" USING btree ("_locale","_parent_id");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_faqs_fk" FOREIGN KEY ("faqs_id") REFERENCES "public"."faqs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_downloads_fk" FOREIGN KEY ("downloads_id") REFERENCES "public"."downloads"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_alumni_batches_fk" FOREIGN KEY ("alumni_batches_id") REFERENCES "public"."alumni_batches"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_faqs_id_idx" ON "payload_locked_documents_rels" USING btree ("faqs_id");
  CREATE INDEX "payload_locked_documents_rels_downloads_id_idx" ON "payload_locked_documents_rels" USING btree ("downloads_id");
  CREATE INDEX "payload_locked_documents_rels_alumni_batches_id_idx" ON "payload_locked_documents_rels" USING btree ("alumni_batches_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "faqs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "faqs_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_faqs_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_faqs_v_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "downloads" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "downloads_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_downloads_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_downloads_v_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "alumni_batches" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "alumni_batches_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_alumni_batches_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_alumni_batches_v_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "about_content_objectives" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "about_content_objectives_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "about_content_facilities" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "about_content_facilities_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "about_content" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "about_content_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "admissions_content_steps" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "admissions_content_steps_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "admissions_content_scholarship_paragraphs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "admissions_content_scholarship_paragraphs_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "admissions_content" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "admissions_content_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "faqs" CASCADE;
  DROP TABLE "faqs_locales" CASCADE;
  DROP TABLE "_faqs_v" CASCADE;
  DROP TABLE "_faqs_v_locales" CASCADE;
  DROP TABLE "downloads" CASCADE;
  DROP TABLE "downloads_locales" CASCADE;
  DROP TABLE "_downloads_v" CASCADE;
  DROP TABLE "_downloads_v_locales" CASCADE;
  DROP TABLE "alumni_batches" CASCADE;
  DROP TABLE "alumni_batches_locales" CASCADE;
  DROP TABLE "_alumni_batches_v" CASCADE;
  DROP TABLE "_alumni_batches_v_locales" CASCADE;
  DROP TABLE "about_content_objectives" CASCADE;
  DROP TABLE "about_content_objectives_locales" CASCADE;
  DROP TABLE "about_content_facilities" CASCADE;
  DROP TABLE "about_content_facilities_locales" CASCADE;
  DROP TABLE "about_content" CASCADE;
  DROP TABLE "about_content_locales" CASCADE;
  DROP TABLE "admissions_content_steps" CASCADE;
  DROP TABLE "admissions_content_steps_locales" CASCADE;
  DROP TABLE "admissions_content_scholarship_paragraphs" CASCADE;
  DROP TABLE "admissions_content_scholarship_paragraphs_locales" CASCADE;
  DROP TABLE "admissions_content" CASCADE;
  DROP TABLE "admissions_content_locales" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_faqs_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_downloads_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_alumni_batches_fk";
  
  DROP INDEX "payload_locked_documents_rels_faqs_id_idx";
  DROP INDEX "payload_locked_documents_rels_downloads_id_idx";
  DROP INDEX "payload_locked_documents_rels_alumni_batches_id_idx";
  ALTER TABLE "categories" DROP COLUMN "kind";
  ALTER TABLE "categories" DROP COLUMN "order";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "faqs_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "downloads_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "alumni_batches_id";
  ALTER TABLE "site_settings_locales" DROP COLUMN "admission_note";
  ALTER TABLE "home_blocks_campus_life_locales" DROP COLUMN "intro";
  DROP TYPE "public"."enum_categories_kind";
  DROP TYPE "public"."enum_faqs_status";
  DROP TYPE "public"."enum__faqs_v_version_status";
  DROP TYPE "public"."enum__faqs_v_published_locale";
  DROP TYPE "public"."enum_downloads_category";
  DROP TYPE "public"."enum_downloads_status";
  DROP TYPE "public"."enum__downloads_v_version_category";
  DROP TYPE "public"."enum__downloads_v_version_status";
  DROP TYPE "public"."enum__downloads_v_published_locale";
  DROP TYPE "public"."enum_alumni_batches_status";
  DROP TYPE "public"."enum__alumni_batches_v_version_status";
  DROP TYPE "public"."enum__alumni_batches_v_published_locale";`)
}
