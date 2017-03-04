import { useDeps, composeWithTracker, composeAll } from 'mantra-core';
import GameBoard from '../components/gameBoard';
import { Games, Exercises }from '/lib/collections';
import { GameStatuses } from '/lib/constants/gameConstants';
import LocalStateKeys from '/lib/constants/localStateKeys';

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
        const myPoints = game.playerA.id === Meteor.userId()
            ? game.playerA.points
            : game.playerB.points;
        if (currentExercise) {
            const areAnswerButtonsDisabled = context().LocalState.get(LocalStateKeys.waitingForNextRound);
            const exercise = Exercises.findOne(currentExercise);
            if (exercise) {
                onData(null, {
                    firstNumber: exercise.firstNumber,
                    secondNumber: exercise.secondNumber,
                    gameType: exercise.type,
                    answerOne: exercise.answers[0],
                    answerTwo: exercise.answers[1],
                    answerThree: exercise.answers[2],
                    answerFour: exercise.answers[3],
                    roundNumber: game.roundNumber,
                    userPoints: myPoints,
                    areAnswerButtonsDisabled
                });
            }
        }
    }
};

export const depsMapper = (context, actions) => ({
    context: () => context,
    enableAnswerButtons: actions.gameActions.enableAnswerButtons
});

export default composeAll(
    composeWithTracker(composer),
    useDeps(depsMapper)
)(GameBoard);
