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
            GameStatuses.finished,
            GameStatuses.serverRestart
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
        type: Object,
        label: 'Data of player A'
    },
    "playerA.id": {
        type: String,
        label: 'Id of a player A'
    },
    "playerA.points": {
        type: Number,
        label: 'Current amount of points',
        defaultValue: 0
    },
    playerB: {
        type: Object,
        label: 'Data of player B'
    },
    "playerB.id": {
        type: String,
        label: 'Id of a player B'
    },
    "playerB.points": {
        type: Number,
        label: 'Current amount of points',
        defaultValue: 0
    },
    winnerId: {
        type: String,
        label: 'User id of a winner',
        optional: true
    },
    roundNumber: {
        type: Number,
        defaultValue: 0
    },
    exercises: {
        type: [String],
        defaultValue: []
    }
});

export default GamesSchema;
