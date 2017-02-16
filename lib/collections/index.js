import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import Logger from '/lib/logging/Logger';
import LogsCollection from './logs';
import GamesCollection from './games';
import QueueHistoryCollection from './queueHistory';

import {
    LogsSchema,
    GamesSchema,
    QueueHistorySchema,
    UsersSchema
} from './schemas/index';

export const Logs = LogsCollection;
export const Games = GamesCollection;
export const QueueHistory = QueueHistoryCollection;
export const Users = Meteor.users;

/* Attaching schemas */
const attachSchemaToCollection = (collection, schema) => {
    if (schema) {
        Logger.info(`Schema for collection ${collection._name} implemented`, __filename);
        collection.attachSchema(schema);
    } else {
        Logger.warn(`Schema for collection ${collection._name} not implemented`, __filename);
    }
};

export const setSchemas = (dbVersion) => {
    Logger.debug(`Set schemas for dbVersion: ${dbVersion}`, __filename);
    attachSchemaToCollection(Logs, LogsSchema(dbVersion));
    attachSchemaToCollection(Games, GamesSchema(dbVersion));
    attachSchemaToCollection(QueueHistory, QueueHistorySchema(dbVersion));
    attachSchemaToCollection(Users, UsersSchema(dbVersion));
};
