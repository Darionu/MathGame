import methods from './methods';
import QueueManager from '../queue';
import Logger from '/lib/logging/Logger';
import ReadyCheck from './readyCheck';
import GameProtocol from './gameProtocol';
import _ from 'lodash';

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
        this._protocol = GameProtocol.getProtocol();
        this.init();
    }

    init() {
        Logger.info(`[GameManager] Game manager initialization for players ${this.playerOne.username}(${this.playerOne._id}) & ${this.playerTwo.username}(${this.playerTwo._id})`, __dirname);
        QueueManager.stopQueue(this.playerOne._id, this.playerTwo._id);
        const readyCheck = new ReadyCheck(this.playerOne, this.playerTwo);
        readyCheck.performReadyCheck().then(() => {
            this.startGame();
        });
    }

    startGame() {
        Logger.info(`[GameManager] Game manager initialization for players ${this.playerOne.username}(${this.playerOne._id}) & ${this.playerTwo.username}(${this.playerTwo._id})`, __dirname);
        this._protocol.send(this._protocol.GAME_IS_READY, {}, _.concat(this.playerOne.sessionIds, this.playerTwo.sessionIds));
    }
};
