import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import DateFormat from '/lib/constants/dateTimeFormat';
import { GameTypes, GameStatuses } from '/lib/constants/gameConstants';

const GameData = new SimpleSchema({
    id: {
        type: String,
        label: 'Id of a player B'
    },
    points: {
        type: Number,
        label: 'Current amount of points',
        defaultValue: 0
    },
    averageTime: {
        type: String,
        label: 'Average time per exercise',
        optional: true
    },
    answers: {
        type: Number,
        label: 'Number of made answers',
        optional: true
    },
    correct: {
        type: Number,
        label: 'Number of correct answers',
        optional: true
    },
    wrong: {
        type: Number,
        label: 'Number of wrong answers',
        optional: true
    }
});

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
    read: {
        type: Boolean,
        defaultValue: false
    },
    date: {
        type: Date,
        regEx: DateFormat.logDateTimeFormatRegex,
        label: 'Create date in format: YYYY-MM-DD HH:mm:ss.SSS',
        autoValue: function() {
            if (this.isInsert) {
                return new Date;
            }
        }
    },
    playerA: {
        type: GameData,
        label: 'Data of player A'
    },
    playerB: {
        type: GameData,
        label: 'Data of player B'
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
