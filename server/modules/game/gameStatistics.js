import Logger from '/lib/logging/Logger';
import { Games, Exercises } from '/lib/collections';
import moment from 'moment';

/**
 * GameStatistics
 *
 * Creates statistics for both players after the finishing game.
 *
 */
export default class {
    constructor(gameId) {
        this.gameId = gameId;
        this.game = null;
        this.exercises = null;

        this.init();
    }

    /**
     * Logic to do at the class initialization.
     * Sets game and exercises documents to class context.
     * @private
     */
    init() {
        Logger.info(`[GameStatistics] Initialization`, __dirname);
        this.game = Games.findOne(this.gameId);
        this.exercises = Exercises.find({
            _id: {
                $in: this.game.exercises
            }
        }).fetch();
    }

    /**
     * Calculates statistics for both of the players.
     * @returns {boolean} result - success/fail.
     */
    calculateStatistics() {
        if (this.game && this.exercises) {
            const playerA = this.calculateStatisticsForPlayer("playerA");
            const playerB = this.calculateStatisticsForPlayer("playerB");

            if (playerA && playerB) {
                return this.saveStatisticsToDb(playerA, playerB);
            }
        }

        return false;
    }

    /**
     * Calculates statistics for a provided player type.
     * @param playerType - playerA/playerB.
     * @returns {Object} playerStatistics - statistics of player.
     */
    calculateStatisticsForPlayer(playerType) {
        let answers = 0;
        let correct = 0;
        let wrong = 0;
        let answerTime = [];

        this.exercises.forEach((exercise) => {
            if (exercise[playerType].answer) {
                answers++;
                exercise[playerType].answer === exercise.correctAnswer ? correct++ : wrong++;
                const timeDifference =
                    moment.duration(moment(exercise[playerType].answerDate).diff(moment(exercise.date)));
                answerTime.push(Math.floor(timeDifference.asSeconds()));
            }
        });

        const time = answerTime.reduce((memo, num) => memo + num, 0) / answerTime.length || 1;
        const averageTime = time.toFixed(2);
        return {
            answers,
            correct,
            wrong,
            averageTime
        };
    }

    /**
     * Saves statistics to the database for a specific game document.
     * @param playerA - statistics of player A.
     * @param playerB - statistics of player B.
     * @returns {boolean} result - success/fail.
     */
    saveStatisticsToDb(playerA, playerB) {
        const playerAResult = Games.update(this.gameId, {
            $set: {
                "playerA.answers": playerA.answers,
                "playerA.correct": playerA.correct,
                "playerA.wrong": playerA.wrong,
                "playerA.averageTime": playerA.averageTime
            }
        });

        const playerBResult = Games.update(this.gameId, {
            $set: {
                "playerB.answers": playerB.answers,
                "playerB.correct": playerB.correct,
                "playerB.wrong": playerB.wrong,
                "playerB.averageTime": playerB.averageTime
            }
        });

        return (playerAResult + playerBResult) === 2;
    }
};
