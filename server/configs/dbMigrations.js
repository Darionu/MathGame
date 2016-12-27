import Logger from '/lib/logging/Logger';
import MigrationConstants from '/lib/constants/migrationConstants';
import { SetSchemas } from '/lib/collections/index';
import migrationV1Up from './migrations/migrationV1Up';

export default () => {
  /* Add migrations here */
    Migrations.add({
        version: MigrationConstants.DB_MIGRATION_VERSION_1,
        up: () => {
            SetSchemas(MigrationConstants.DB_MIGRATION_VERSION_1);
            migrationV1Up();
        }
    });


  /* Migrations config */
    const migrationsLogger = (opts) => {
        switch (opts.level) {
            case MigrationConstants.debug:
                Logger.debug(`${opts.tag} ${opts.message}`, __filename);
            break;
            case MigrationConstants.info:
                Logger.info(`${opts.tag} ${opts.message}`, __filename);
            break;
            case MigrationConstants.warn:
                Logger.warn(`${opts.tag} ${opts.message}`, __filename);
            break;
            case MigrationConstants.error:
                Logger.error(`${opts.tag} ${opts.message}`, __filename);
            break;
        }
    };

    Migrations.config({
        log: true,
        logger: migrationsLogger,
        logIfLatest: true
    });

  /* Reattaching db schemes after Meteor restart */
    if (Migrations.getVersion()) {
        SetSchemas(Migrations.getVersion());
    }

  /* DB migration target */
    Migrations.migrateTo(MigrationConstants.DB_MIGRATION_VERSION_1);
};
