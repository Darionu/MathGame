import { useDeps, composeWithTracker, composeAll } from 'mantra-core';
import GameBoard from '../components/gameBoard';
import { Games, Exercises }from '/lib/collections';
import { GameStatuses, GameTypes } from '/lib/constants/gameConstants';

const getGameEquation = (gameType) => {
    switch(gameType) {
        case GameTypes.addition:
            return '+';
        case GameTypes.subtraction:
            return '-';
        case GameTypes.multiplication:
            return '*';
        case GameTypes.division:
            return '-';
        default:
            return 'UNKNOWN';
    }
};

export const composer = ({ context }, onData) => {
    const game = Games.findOne({
        status: {
            $in: [
                GameStatuses.initialized,
                GameStatuses.started,
                GameStatuses.created
            ]
        }
    });
    if (game && game.exercises && game.roundNumber > 0) {
        const currentExercise = game.exercises[game.roundNumber - 1];
        if (currentExercise) {
            const exercise = Exercises.findOne(currentExercise);
            if (exercise) {
                onData(null, {
                    firstNumber: exercise.firstNumber,
                    secondNumber: exercise.secondNumber,
                    equation: getGameEquation(exercise.type),
                    answerOne: exercise.answers[0],
                    answerTwo: exercise.answers[1],
                    answerThird: exercise.answers[2],
                    answerFour: exercise.answers[3]
                });
            }
        }
    }
};

export const depsMapper = (context, actions) => ({
    context: () => context
});

export default composeAll(
    composeWithTracker(composer),
    useDeps(depsMapper)
)(GameBoard);
