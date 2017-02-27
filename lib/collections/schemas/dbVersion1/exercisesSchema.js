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
    playerAChoice: {
        type: Number,
        optional: true
    },
    playerAChoiceDelay: {
        type: Number,
        optional: true
    },
    playerBChoice: {
        type: Number,
        optional: true
    },
    playerBChoiceDelay: {
        type: Number,
        optional: true
    }
});

export default ExercisesSchema;
