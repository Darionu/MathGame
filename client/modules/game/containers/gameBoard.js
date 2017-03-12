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
        const playerType = game.playerA.id === Meteor.userId()
            ? "playerA"
            : "playerB";
        const opponentType = game.playerA.id !== Meteor.userId()
            ? "playerA"
            : "playerB";
        const myself = Meteor.users.findOne(Meteor.userId());
        const opponent = Meteor.users.findOne(game[opponentType].id);
        const playerData = {
            _id: myself._id,
            username: myself.username,
            points: game[playerType].points
        };
        const opponentData = {
            _id: opponent._id,
            username: opponent.username,
            points: game[opponentType].points
        };

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
                    areAnswerButtonsDisabled,
                    playerData,
                    opponentData
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
