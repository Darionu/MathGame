import GameProtocol from '/lib/protocols/Game.protocol.js';

/**
 * GameProtocolInstance
 */
export default new class {
    constructor() {
        this._protocol = new GameProtocol();
    }

    /**
     * Returns instance of GameProtocol.
     */
    getProtocol() {
        return this._protocol;
    }
};
