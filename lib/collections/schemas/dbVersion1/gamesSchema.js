import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import DateFormat from '/lib/constants/dateTimeFormat';
import { GameTypes, GameStatuses } from '/lib/constants/gameConstants';

const GamesSchema = new SimpleSchema({
    type: {
        type: Number,
        allowedValues: [
            GameTypes.addition,
            GameTypes.subtraction,
            GameTypes.multiplication,
            GameTypes.division
        ]
    },
    status: {
        type: Number,
        allowedValues: [
            GameStatuses.created,
            GameStatuses.initialized,
            GameStatuses.started,
            GameStatuses.finished
        ],
        defaultValue: GameStatuses.created
    },
    date: {
        type: Date,
        regEx: DateFormat.logDateTimeFormatRegex,
        label: 'Create date in format: YYYY-MM-DD HH:mm:ss.SSS',
        defaultValue: new Date()
    },
    playerA: {
        type: String,
        label: 'User id of player A'
    },
    playerB: {
        type: String,
        label: 'User id of player B'
    },
    winnerId: {
        type: String,
        label: 'User id of a winner',
        optional: true
    },
    roundNumber: {
        type: Number,
        defaultValue: 0
    }
});

export default GamesSchema;
