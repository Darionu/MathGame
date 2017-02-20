import GameProtocol from '/lib/protocols/Game.protocol.js';
import Logger from '/lib/logging/Logger';

export default class {
    constructor() {
        this.init();
    }

    init() {
        this.initProtocol();
    }

    /**
     * Initialize GameProtocol and set listeners.
     */
    initProtocol() {
        Logger.info('[GameManager] Protocol initialization.', __filename);
        this._protocol = new GameProtocol();
        this._protocol.on(this._protocol.READY_CHECK, Meteor.bindEnvironment(this.sendReady.bind(this)));
        this._protocol.on(this._protocol.GAME_IS_READY, Meteor.bindEnvironment(this.startGame.bind(this)));
    }

    /**
     * After receive READY_CHECK from the server send back response with the same message id.
     */
    sendReady() {
        Logger.info('[GameManager] Received READY_CHECK from the server. Sending response...', __filename);
        this._protocol.send(this._protocol.READY_CHECK, { ready: true });
    }

    /**
     * After receive GAME_IS_READY initialize game.
     */
    startGame() {
        Logger.info('[GameManager] Received GAME_STARTED message from the server. Starting the game..', __filename);
        alert('FOUND OPPONENT. GAME STARTED');
    }
};
