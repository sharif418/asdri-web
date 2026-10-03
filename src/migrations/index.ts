import * as migration_20261003_122837_initial from './20261003_122837_initial';
import * as migration_20261003_134123_drop_template_header_footer from './20261003_134123_drop_template_header_footer';
import * as migration_20261003_134128_site_shell_globals from './20261003_134128_site_shell_globals';

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
    name: '20261003_134128_site_shell_globals'
  },
];
