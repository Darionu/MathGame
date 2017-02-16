import methods from './methods';
import QueueManager from '../queue';
import Logger from '/lib/logging/Logger';

/**
 * GameManager
 *
 * This class is responsible for the game mechanism.
 */
export default class {
    constructor(playerOne, playerTwo, gameType) {
        methods();

        this.playerOne = playerOne;
        this.playerTwo = playerTwo;
        this.gameType = gameType;

        this.init();
    }

    init() {
        Logger.info(
            `[GameManager] Game manager initialized for players \
            ${this.playerOne.username}(${this.playerOne._id}) &\
            ${this.playerTwo.username}(${this.playerTwo._id})`,
            __dirname
        );
        QueueManager.stopQueue(this.playerOne._id, this.playerTwo._id);
    }

};
