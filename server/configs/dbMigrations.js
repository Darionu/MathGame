import Logger from '/lib/logging/Logger';
import MigrationConstants from '/lib/constants/migrationConstants';
import { setSchemas } from '/lib/collections/index';
import migrationV1Up from './migrations/migrationV1Up';
import migrationV2Up from './migrations/migrationV2Up';

export default () => {
  /* Add migrations here */
    Migrations.add({
        version: MigrationConstants.DB_MIGRATION_VERSION_1,
        up: () => {
            setSchemas(MigrationConstants.DB_MIGRATION_VERSION_1);
            migrationV1Up();
        }
    });

    Migrations.add({
        version: MigrationConstants.DB_MIGRATION_VERSION_2,
        up: () => {
            setSchemas(MigrationConstants.DB_MIGRATION_VERSION_2);
            migrationV2Up();
        }
    });


  /* Migrations config */
    const migrationsLogger = (options) => {
        switch (options.level) {
            case MigrationConstants.debug:
                Logger.debug(`${options.tag} ${options.message}`, __filename);
                break;
            case MigrationConstants.info:
                Logger.info(`${options.tag} ${options.message}`, __filename);
                break;
            case MigrationConstants.warn:
                Logger.warn(`${options.tag} ${options.message}`, __filename);
                break;
            case MigrationConstants.error:
                Logger.error(`${options.tag} ${options.message}`, __filename);
                break;
            default:
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
        setSchemas(Migrations.getVersion());
    }

  /* DB migration target */
    Migrations.migrateTo(MigrationConstants.DB_TARGET_VERSION);
};
