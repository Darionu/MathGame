import Logger from '/lib/logging/Logger';
import MigrationConstants from '/lib/constants/migrationConstants';
import logsSchemaV1 from './dbVersion1/logsSchema';

const logsSchemas = new Map();
logsSchemas.set(MigrationConstants.DB_MIGRATION_VERSION_1, logsSchemaV1);

const getSchemaFromMap = (schemaMap, dbVersion) => {
    try {
        return schemaMap.get(dbVersion);
    } catch (error) {
        Logger.warn(`Schema in for db version ${dbVersion} not implemented`, __filename);
        return null;
    }
};

export const LogsSchema = (dbVersion) => getSchemaFromMap(logsSchemas, dbVersion);
