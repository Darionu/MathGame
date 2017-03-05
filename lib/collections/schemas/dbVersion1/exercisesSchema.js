import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { GameTypes } from '/lib/constants/gameConstants';

const ExercisesSchema = new SimpleSchema({
    type: {
        type: Number,
        allowedValues: [
            GameTypes.addition,
            GameTypes.subtraction,
            GameTypes.multiplication,
            GameTypes.division
        ]
    },
    date: {
        type: Date,
        autoValue: function() {
            if (this.isInsert) {
                return new Date;
            }
        }
    },
    firstNumber: {
        type: Number
    },
    secondNumber: {
        type: Number
    },
    correctAnswer: {
        type: Number
    },
    answers: {
        type: [Number]
    },
    playerA: {
        type: Object,
        label: 'Exercise data of player A',
        defaultValue: {}
    },
    "playerA.answer": {
        type: Number,
        optional: true
    },
    "playerA.answerDate": {
        type: Date,
        optional: true
    },
    playerB: {
        type: Object,
        label: 'Exercise data of player B',
        defaultValue: {}
    },
    "playerB.answer": {
        type: Number,
        optional: true
    },
    "playerB.answerDate": {
        type: Date,
        optional: true
    }
});

export default ExercisesSchema;
