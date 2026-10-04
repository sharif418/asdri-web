import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

/**
 * 20261003_153157_people_collection was generated without the S3 variables set, so the storage
 * plugin's `_objectKey` field was absent from the schema diff and the column was dropped. Dev
 * databases got it back through `push`; a fresh database (CI, staging, production) did not, and
 * every `/api/media/file/*` request failed with "column _objectkey does not exist".
 * Idempotent so it is safe on databases that already carry the column.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "_objectkey" varchar;`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "media" DROP COLUMN IF EXISTS "_objectkey";`)
}
