import GameProtocol from './gameProtocol';
import Logger from '/lib/logging/Logger';
import _ from 'lodash';
import TimeConstants from '/lib/constants/timeConstants';

/**
 * ReadyCheck
 *
 * This class is responsible for checking if both players
 * are ready to start the game.
 */
export default class {
    constructor(playerOne, playerTwo) {
        this._protocol = GameProtocol.getProtocol();
        this.playerOne = playerOne;
        this.playerTwo = playerTwo;
        this.waitingLimit = 10;
        this.init();
    }

    /**
     * Invokes sending ready request function.
     * After it check if the player statuses changed to ready.
     * Rejects after exceeding the waiting limit.
     * @public
     * @returns {Promise} promise
     *                    resolve - both players are ready
     *                    reject - players are not ready
     */
    performReadyCheck() {
        return new Promise((resolve, reject) => {
            this.sendReadyRequest();
            this.readyCheckInterval = Meteor.setInterval(() => {
                this.waitingStatus += 1;
                if (this.playerOneReady && this.playerTwoReady) {
                    Meteor.clearInterval(this.readyCheckInterval);
                    resolve();
                } else if ( this.waitingStatus >= this.waitingLimit) {
                    Meteor.clearInterval(this.readyCheckInterval);
                    reject();
                }
            }, TimeConstants.oneSecond);
        });
    }

    /**
     *  Code to be invoked at the class initialization.
     *  Init protocol and set ready flag for both players to false.
     *  @private
     */
    init() {
        Logger.info(`[ReadyCheck] Ready check initialization for players ${this.playerOne.username}(${this.playerOne._id}) & ${this.playerTwo.username}(${this.playerTwo._id})`, __dirname);
        this.initProtocolListener();
        this.playerOneReady = false;
        this.playerTwoReady = false;
        this.waitingStatus = 0;
    }

    /**
     *  Initialize GameProtocol and add listener for READY_CHECK.
     *  @private
     */
    initProtocolListener() {
        this._protocol.on(this._protocol.READY_CHECK, Meteor.bindEnvironment(this.handlePlayerReady.bind(this)));
    }

    /**
     *  Send ready request to both players via protocol.
     *  @private
     */
    sendReadyRequest() {
        Logger.info(`[ReadyCheck] Send ready check request to players ${this.playerOne.username}(${this.playerOne._id}) & ${this.playerTwo.username}(${this.playerTwo._id})`, __dirname);
        this._protocol.send(this._protocol.READY_CHECK, {}, this.playerOne.sessionIds);
        this._protocol.send(this._protocol.READY_CHECK, {}, this.playerTwo.sessionIds);
    }

    /**
     * Handle receiving READY_CHECK from the clients.
     * Checks if the clients are the ones which we are waiting for.
     * If it's true then change the ready flag to a new one.
     * @param data - data received from the client.
     * @param sessionId - sessionId of the client.
     * @private
     */
    handlePlayerReady(data, sessionId) {
        if (_.includes(this.playerOne.sessionIds, sessionId)) {
            this.playerOneReady = data.ready;
            Logger.info(`[ReadyCheck] Received ready confirmation (${data.ready}) from player ${this.playerOne.username}(${this.playerOne._id})`, __dirname);
        } else if (_.includes(this.playerTwo.sessionIds, sessionId)) {
            this.playerTwoReady = data.ready;
            Logger.info(`[ReadyCheck] Received ready confirmation (${data.ready}) from player ${this.playerTwo.username}(${this.playerTwo._id})`, __dirname);
        }
    }
};
