import Logger from '/lib/logging/Logger';

import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import LogsCollection from './logs';

import {
    LogsSchema
} from './schemas/index';

export const Logs = LogsCollection;

/* Attaching schemas */
const attachSchemaToCollection = (collection, schema) => {
    if (schema) {
        Logger.info(`Schema for collection ${collection._name} implemented`, __filename);
        collection.attachSchema(schema);
    } else {
        Logger.warn(`Schema for collection ${collection._name} not implemented`, __filename);
    }
};

export const SetSchemas = (dbVersion) => {
    Logger.debug(`Set schemas for dbVersion: ${dbVersion}`, __filename);
    attachSchemaToCollection(Logs, LogsSchema(dbVersion));
};
