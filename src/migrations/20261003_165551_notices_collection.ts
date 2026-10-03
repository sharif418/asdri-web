import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_notices_category" AS ENUM('admission', 'recruitment', 'academic', 'general');
  CREATE TYPE "public"."enum_notices_status_override" AS ENUM('new', 'active', 'closed');
  CREATE TYPE "public"."enum_notices_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__notices_v_version_category" AS ENUM('admission', 'recruitment', 'academic', 'general');
  CREATE TYPE "public"."enum__notices_v_version_status_override" AS ENUM('new', 'active', 'closed');
  CREATE TYPE "public"."enum__notices_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__notices_v_published_locale" AS ENUM('bn', 'en');
  CREATE TABLE "notices_attachments" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"file_id" integer
  );
  
  CREATE TABLE "notices_attachments_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "notices" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"category" "enum_notices_category",
  	"published_at" timestamp(3) with time zone,
  	"active_from" timestamp(3) with time zone,
  	"active_until" timestamp(3) with time zone,
  	"status_override" "enum_notices_status_override",
  	"apply_link" varchar,
  	"pinned" boolean DEFAULT false,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_notices_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "notices_locales" (
  	"title" varchar,
  	"body" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_notices_v_version_attachments" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"file_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_notices_v_version_attachments_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_notices_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_category" "enum__notices_v_version_category",
  	"version_published_at" timestamp(3) with time zone,
  	"version_active_from" timestamp(3) with time zone,
  	"version_active_until" timestamp(3) with time zone,
  	"version_status_override" "enum__notices_v_version_status_override",
  	"version_apply_link" varchar,
  	"version_pinned" boolean DEFAULT false,
  	"version_generate_slug" boolean DEFAULT true,
  	"version_slug" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__notices_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__notices_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_notices_v_locales" (
  	"version_title" varchar,
  	"version_body" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "notices_id" integer;
  ALTER TABLE "notices_attachments" ADD CONSTRAINT "notices_attachments_file_id_media_id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "notices_attachments" ADD CONSTRAINT "notices_attachments_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."notices"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "notices_attachments_locales" ADD CONSTRAINT "notices_attachments_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."notices_attachments"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "notices_locales" ADD CONSTRAINT "notices_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."notices"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_notices_v_version_attachments" ADD CONSTRAINT "_notices_v_version_attachments_file_id_media_id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_notices_v_version_attachments" ADD CONSTRAINT "_notices_v_version_attachments_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_notices_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_notices_v_version_attachments_locales" ADD CONSTRAINT "_notices_v_version_attachments_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_notices_v_version_attachments"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_notices_v" ADD CONSTRAINT "_notices_v_parent_id_notices_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."notices"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_notices_v_locales" ADD CONSTRAINT "_notices_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_notices_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "notices_attachments_order_idx" ON "notices_attachments" USING btree ("_order");
  CREATE INDEX "notices_attachments_parent_id_idx" ON "notices_attachments" USING btree ("_parent_id");
  CREATE INDEX "notices_attachments_file_idx" ON "notices_attachments" USING btree ("file_id");
  CREATE UNIQUE INDEX "notices_attachments_locales_locale_parent_id_unique" ON "notices_attachments_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "notices_slug_idx" ON "notices" USING btree ("slug");
  CREATE INDEX "notices_updated_at_idx" ON "notices" USING btree ("updated_at");
  CREATE INDEX "notices_created_at_idx" ON "notices" USING btree ("created_at");
  CREATE INDEX "notices__status_idx" ON "notices" USING btree ("_status");
  CREATE UNIQUE INDEX "notices_locales_locale_parent_id_unique" ON "notices_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_notices_v_version_attachments_order_idx" ON "_notices_v_version_attachments" USING btree ("_order");
  CREATE INDEX "_notices_v_version_attachments_parent_id_idx" ON "_notices_v_version_attachments" USING btree ("_parent_id");
  CREATE INDEX "_notices_v_version_attachments_file_idx" ON "_notices_v_version_attachments" USING btree ("file_id");
  CREATE UNIQUE INDEX "_notices_v_version_attachments_locales_locale_parent_id_uniq" ON "_notices_v_version_attachments_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_notices_v_parent_idx" ON "_notices_v" USING btree ("parent_id");
  CREATE INDEX "_notices_v_version_version_slug_idx" ON "_notices_v" USING btree ("version_slug");
  CREATE INDEX "_notices_v_version_version_updated_at_idx" ON "_notices_v" USING btree ("version_updated_at");
  CREATE INDEX "_notices_v_version_version_created_at_idx" ON "_notices_v" USING btree ("version_created_at");
  CREATE INDEX "_notices_v_version_version__status_idx" ON "_notices_v" USING btree ("version__status");
  CREATE INDEX "_notices_v_created_at_idx" ON "_notices_v" USING btree ("created_at");
  CREATE INDEX "_notices_v_updated_at_idx" ON "_notices_v" USING btree ("updated_at");
  CREATE INDEX "_notices_v_snapshot_idx" ON "_notices_v" USING btree ("snapshot");
  CREATE INDEX "_notices_v_published_locale_idx" ON "_notices_v" USING btree ("published_locale");
  CREATE INDEX "_notices_v_latest_idx" ON "_notices_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_notices_v_locales_locale_parent_id_unique" ON "_notices_v_locales" USING btree ("_locale","_parent_id");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_notices_fk" FOREIGN KEY ("notices_id") REFERENCES "public"."notices"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_notices_id_idx" ON "payload_locked_documents_rels" USING btree ("notices_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "notices_attachments" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "notices_attachments_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "notices" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "notices_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_notices_v_version_attachments" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_notices_v_version_attachments_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_notices_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_notices_v_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "notices_attachments" CASCADE;
  DROP TABLE "notices_attachments_locales" CASCADE;
  DROP TABLE "notices" CASCADE;
  DROP TABLE "notices_locales" CASCADE;
  DROP TABLE "_notices_v_version_attachments" CASCADE;
  DROP TABLE "_notices_v_version_attachments_locales" CASCADE;
  DROP TABLE "_notices_v" CASCADE;
  DROP TABLE "_notices_v_locales" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_notices_fk";
  
  DROP INDEX "payload_locked_documents_rels_notices_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "notices_id";
  DROP TYPE "public"."enum_notices_category";
  DROP TYPE "public"."enum_notices_status_override";
  DROP TYPE "public"."enum_notices_status";
  DROP TYPE "public"."enum__notices_v_version_category";
  DROP TYPE "public"."enum__notices_v_version_status_override";
  DROP TYPE "public"."enum__notices_v_version_status";
  DROP TYPE "public"."enum__notices_v_published_locale";`)
}
