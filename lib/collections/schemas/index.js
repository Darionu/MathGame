import Logger from '/lib/logging/Logger';
import MigrationConstants from '/lib/constants/migrationConstants';
import logsSchemaV1 from './dbVersion1/logsSchema';
import gamesSchemaV1 from './dbVersion1/gamesSchema';
import queueHistorySchemaV1 from './dbVersion1/queueHistorySchema';
import exercisesSchemaV1 from './dbVersion1/exercisesSchema';

import usersSchemaV1 from './dbVersion1/usersSchema';
import usersSchemaV2 from './dbVersion2/usersSchema';

const logsSchemas = new Map();
logsSchemas.set(MigrationConstants.DB_MIGRATION_VERSION_1, logsSchemaV1);
logsSchemas.set(MigrationConstants.DB_MIGRATION_VERSION_2, logsSchemaV1);

const gamesSchemas = new Map();
gamesSchemas.set(MigrationConstants.DB_MIGRATION_VERSION_1, gamesSchemaV1);
gamesSchemas.set(MigrationConstants.DB_MIGRATION_VERSION_2, gamesSchemaV1);

const queueHistorySchema = new Map();
queueHistorySchema.set(MigrationConstants.DB_MIGRATION_VERSION_1, queueHistorySchemaV1);
queueHistorySchema.set(MigrationConstants.DB_MIGRATION_VERSION_2, queueHistorySchemaV1);

const usersSchema = new Map();
usersSchema.set(MigrationConstants.DB_MIGRATION_VERSION_1, usersSchemaV1);
usersSchema.set(MigrationConstants.DB_MIGRATION_VERSION_2, usersSchemaV2);

const exercisesSchema = new Map();
exercisesSchema.set(MigrationConstants.DB_MIGRATION_VERSION_1, exercisesSchemaV1);
exercisesSchema.set(MigrationConstants.DB_MIGRATION_VERSION_2, exercisesSchemaV1);

const getSchemaFromMap = (schemaMap, dbVersion) => {
    try {
        return schemaMap.get(dbVersion);
    } catch (error) {
        Logger.warn(
            `Schema in for db version ${dbVersion} not implemented, ${error.reason ? error.reason : error}`,
            __filename
        );
        return null;
    }
};

export const LogsSchema = (dbVersion) => getSchemaFromMap(logsSchemas, dbVersion);
export const GamesSchema = (dbVersion) => getSchemaFromMap(gamesSchemas, dbVersion);
export const QueueHistorySchema = (dbVersion) => getSchemaFromMap(queueHistorySchema, dbVersion);
export const UsersSchema = (dbVersion) => getSchemaFromMap(usersSchema, dbVersion);
export const ExercisesSchema = (dbVersion) => getSchemaFromMap(exercisesSchema, dbVersion);
