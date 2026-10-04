import * as migration_20261003_122837_initial from './20261003_122837_initial';
import * as migration_20261003_134123_drop_template_header_footer from './20261003_134123_drop_template_header_footer';
import * as migration_20261003_134128_site_shell_globals from './20261003_134128_site_shell_globals';
import * as migration_20261003_153157_people_collection from './20261003_153157_people_collection';
import * as migration_20261003_163402_courses_collection from './20261003_163402_courses_collection';
import * as migration_20261003_165551_notices_collection from './20261003_165551_notices_collection';
import * as migration_20261003_173258_home_global from './20261003_173258_home_global';
import * as migration_20261003_184057_faqs_downloads_alumni_globals from './20261003_184057_faqs_downloads_alumni_globals';
import * as migration_20261003_184124_categories_localised_title from './20261003_184124_categories_localised_title';
import * as migration_20261004_062500_restore_media_objectkey from './20261004_062500_restore_media_objectkey';

export const migrations = [
  {
    up: migration_20261003_122837_initial.up,
    down: migration_20261003_122837_initial.down,
    name: '20261003_122837_initial',
  },
  {
    up: migration_20261003_134123_drop_template_header_footer.up,
    down: migration_20261003_134123_drop_template_header_footer.down,
    name: '20261003_134123_drop_template_header_footer',
  },
  {
    up: migration_20261003_134128_site_shell_globals.up,
    down: migration_20261003_134128_site_shell_globals.down,
    name: '20261003_134128_site_shell_globals',
  },
  {
    up: migration_20261003_153157_people_collection.up,
    down: migration_20261003_153157_people_collection.down,
    name: '20261003_153157_people_collection',
  },
  {
    up: migration_20261003_163402_courses_collection.up,
    down: migration_20261003_163402_courses_collection.down,
    name: '20261003_163402_courses_collection',
  },
  {
    up: migration_20261003_165551_notices_collection.up,
    down: migration_20261003_165551_notices_collection.down,
    name: '20261003_165551_notices_collection',
  },
  {
    up: migration_20261003_173258_home_global.up,
    down: migration_20261003_173258_home_global.down,
    name: '20261003_173258_home_global',
  },
  {
    up: migration_20261003_184057_faqs_downloads_alumni_globals.up,
    down: migration_20261003_184057_faqs_downloads_alumni_globals.down,
    name: '20261003_184057_faqs_downloads_alumni_globals',
  },
  {
    up: migration_20261003_184124_categories_localised_title.up,
    down: migration_20261003_184124_categories_localised_title.down,
    name: '20261003_184124_categories_localised_title',
  },
  {
    up: migration_20261004_062500_restore_media_objectkey.up,
    down: migration_20261004_062500_restore_media_objectkey.down,
    name: '20261004_062500_restore_media_objectkey',
  },
];
