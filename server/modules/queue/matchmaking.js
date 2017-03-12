import _ from 'lodash';
import { QueueHistory } from '/lib/collections/index';
import QueueStatuses from '/lib/constants/queueStatuses';
import { QueuePriorities } from '/lib/constants/queuePriorities';
import Logger from '/lib/logging/Logger';
import GameManager from './../game';

/**
 * Matchmaking
 *
 * Matchmaking instance is used to match players awaiting in the queue.
 * Depends on the queue priority and the number of played games they are matched.
 * The higher the priority is the higher is the acceptable difference in games played.
 */
export default class Matchmaking {
    constructor(gameType) {
        this.gameType = gameType;
    }

    /**
     * Starts matchmaking system.
     * Returns promise's resolve after finish.
     */
    initMatchmaking() {
        return new Promise((resolve, reject) => {
            this.matchMadeCycle(resolve, reject);
        });
    }

    /**
     * A single matchMade cycle.
     * @param {function} resolve - Promise's resolve function
     * @param {function} reject - Promise's reject function
     */
    matchMadeCycle(resolve, reject) {
        const playersInsideQueue = this.getAwaitingPlayers();
        this.loopThroughPlayers(playersInsideQueue).then((result) => {
            if (result) {
                this.matchMadeCycle(resolve, reject);
            } else {
                resolve();
            }
        }).catch((error) => {
            reject(error);
        });
    }

    /**
     * For a list of players try to find a suitable opponent using findSuitablePlayer method.
     * If the opponent was not found then try the same for the next one, otherwise return true.
     * @param {Array} playerList - list of players waiting in queue.
     * @returns {Promise} resolve - was the opponent found (true) or not (false).
     */
    loopThroughPlayers(playerList) {
        return new Promise((resolve) => {
            let foundMatch = false;
            if (playerList.length < 2) {
                resolve(foundMatch);
            }

            _.forEach(playerList, (player) => {
                foundMatch = this.findSuitablePlayer(playerList, player);
                if (foundMatch) {
                    return false;
                }
            });

            resolve(foundMatch);
        });
    }

    /**
     * For a specific player's queue record we are trying to find a suitable opponent.
     * If there is one then we are returning true, false otherwise.
     * @param {Array} playerList - list of the players to get from a valid opponent.
     * @param {Object} player - player which needs a match.
     * @returns {boolean} matchedFound
     */
    findSuitablePlayer(playerList, player) {
        let matchedPlayer = false;

        _.forEach(playerList, (playerToMatch) => {
            if (player.userId !== playerToMatch.userId) {
                const playerOne = Meteor.users.findOne(player.userId);
                const playerTwo = Meteor.users.findOne(playerToMatch.userId);
                if (playerOne && playerTwo) {
                    const result = this.isDifferenceAcceptable(player.priority, playerOne, playerTwo);
                    if (result) {
                        Logger.info(
                            `[Matchmaking] Matched players ${playerOne.username}(${playerOne._id}) & ${playerTwo.username}(${playerTwo._id})`,
                            __dirname
                        );
                        GameManager.startGame(playerOne, playerTwo, this.gameType);
                        matchedPlayer = true;
                        return false;
                    }
                }
            }
        });

        return matchedPlayer;
    }

    /**
     * Gets absolute of difference between two players game counts.
     * Then check if the difference matches the requirements of the current priority level.
     * @param {number} priority - current priority level of the first player
     * @param {Object} playerOne - Meteor user object of the first player
     * @param {Object} playerTwo - Meteor user object of the second player
     * @returns {boolean} isDifferenceAcceptable
     */
    isDifferenceAcceptable(priority, playerOne, playerTwo) {
        const playerOneGameCount = playerOne.gameData.wins + playerOne.gameData.loses;
        const playerTwoGameCount = playerTwo.gameData.wins + playerTwo.gameData.loses;

        switch (priority) {
            case QueuePriorities.veryLow:
                return Math.abs(playerOneGameCount - playerTwoGameCount) < 10;
                break;
            case QueuePriorities.low:
                return Math.abs(playerOneGameCount - playerTwoGameCount) < 25;
                break;
            case QueuePriorities.medium:
                return Math.abs(playerOneGameCount - playerTwoGameCount) < 50;
                break;
            case QueuePriorities.high:
                return Math.abs(playerOneGameCount - playerTwoGameCount) < 150;
                break;
            case QueuePriorities.veryHigh:
                return Math.abs(playerOneGameCount - playerTwoGameCount) < 300;
                break;
            case QueuePriorities.urgent:
                return true;
                break;
            default:
                return false;
        }
    }

    /**
     * Finds and returns list of active queue records for specific players.
     * @returns {Array} playerList
     */
    getAwaitingPlayers() {
        return QueueHistory.find({
            status: QueueStatuses.started,
            gameType: this.gameType
        }, {
            fields: {
                userId: 1,
                priority: 1
            }
        }).fetch();
    }
};
