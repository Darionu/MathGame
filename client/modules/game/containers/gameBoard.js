import { useDeps, composeWithTracker, composeAll } from 'mantra-core';
import GameBoard from '../components/gameBoard';
import { Games, Exercises }from '/lib/collections';
import { GameStatuses } from '/lib/constants/gameConstants';

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
    console.log(game);
    if (game && game.exercises && game.roundNumber > 0) {
        const currentExercise = game.exercises[game.roundNumber - 1];
        if (currentExercise) {
            const exercise = Exercises.findOne(currentExercise);
            console.log(exercise);
            if (exercise) {
                onData(null, {
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
