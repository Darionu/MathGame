import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import LanguageConstants from '/lib/constants/languageConstants';

const GameDataSchema = new SimpleSchema({
    loses: {
        type: Number
    },
    wins: {
        type: Number
    }
});

const UserDataSchema = new SimpleSchema({
    language: {
        type: String,
        allowedValues: [
            LanguageConstants.english,
            LanguageConstants.polish
        ]
    },
    avatar: {
        type: String
    }
});

const UserSchema = new SimpleSchema({
    username: {
        type: String
    },
    emails: {
        type: Array,
        optional: true
    },
    "emails.$": {
        type: Object
    },
    "emails.$.address": {
        type: String,
        regEx: SimpleSchema.RegEx.Email
    },
    "emails.$.verified": {
        type: Boolean
    },
    createdAt: {
        type: Date
    },
    userData: {
        type: UserDataSchema,
        optional: true
    },
    gameData: {
        type: GameDataSchema,
        optional: true
    },
    services: {
        type: Object,
        optional: true,
        blackbox: true
    },
    heartbeat: {
        type: Date,
        optional: true
    },
    sessionIds: {
        type: [String],
        optional: true
    }
});

export default UserSchema;
