import methods from './methods';
import QueueManager from '../queue';
import Logger from '/lib/logging/Logger';
import ReadyCheck from './readyCheck';
import GameProtocol from './gameProtocol';
import { Games } from '/lib/collections';
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

    /**
     * Logic to do at the class initialization.
     * Launch ready check mechanism and after it's promise start the game.
     */
    init() {
        Logger.info(`[GameManager] Game manager initialization for players ${this.playerOne.username}(${this.playerOne._id}) & ${this.playerTwo.username}(${this.playerTwo._id})`, __dirname);
        QueueManager.stopQueue(this.playerOne._id, this.playerTwo._id);
        const readyCheck = new ReadyCheck(this.playerOne, this.playerTwo);
        readyCheck.performReadyCheck().then(() => {
            this.startGame();
        });
    }

    /**
     * Start the game by putting it's record in the database and
     * starting first round.
     */
    startGame() {
        Logger.info(`[GameManager] Game manager initialization for players ${this.playerOne.username}(${this.playerOne._id}) & ${this.playerTwo.username}(${this.playerTwo._id})`, __dirname);
        Games.insert({
            type: this.gameType,
            playerA: this.playerOne._id,
            playerB: this.playerTwo._id
        });
    }
};
