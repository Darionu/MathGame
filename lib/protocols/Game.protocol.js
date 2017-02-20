const GameProtocol = class extends CustomProtocol {
    constructor() {
        super();
        this.READY_CHECK = 1;
        this.GAME_IS_READY = 2;
        this.registerProtocol('GameProtocol');
        this.registerMessage(this.READY_CHECK, { });
        this.registerMessage(this.GAME_IS_READY, { });
    }

    encode(messageId, definition, ...payload) {
        return JSON.stringify(payload[0]);
    }

    decode(messageId, definiton, rawMessage) {
        return JSON.parse(rawMessage);
    }
};

export default GameProtocol;
