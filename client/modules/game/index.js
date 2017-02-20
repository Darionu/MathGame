import actions from './actions';
import GameManager from './libs/game';

export default {
    actions,
    load(context) {
        const providers = context.providers;
        providers.gameManager = new GameManager();
    }
};
