import Logger from '/lib/logging/Logger';
import MigrationConstants from '/lib/constants/migrationConstants';
import logsSchemaV1 from './dbVersion1/logsSchema';
import gamesSchemaV1 from './dbVersion1/gamesSchema';
import queueHistorySchemaV1 from './dbVersion1/queueHistorySchema';

const logsSchemas = new Map();
logsSchemas.set(MigrationConstants.DB_MIGRATION_VERSION_1, logsSchemaV1);

const gamesSchemas = new Map();
gamesSchemas.set(MigrationConstants.DB_MIGRATION_VERSION_1, gamesSchemaV1);

const queueHistorySchema = new Map();
gamesSchemas.set(MigrationConstants.DB_MIGRATION_VERSION_1, queueHistorySchemaV1);

const getSchemaFromMap = (schemaMap, dbVersion) => {
    try {
        return schemaMap.get(dbVersion);
    } catch (error) {
        Logger.warn(`Schema in for db version ${dbVersion} not implemented, ${error.reason ? error.reason : error}`, __filename);
        return null;
    }
};

export const LogsSchema = (dbVersion) => getSchemaFromMap(logsSchemas, dbVersion);
export const GamesSchema = (dbVersion) => getSchemaFromMap(gamesSchemas, dbVersion);
export const QueueHistorySchema = (dbVersion) => getSchemaFromMap(queueHistorySchema, dbVersion);
