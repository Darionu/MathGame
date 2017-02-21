import actions from './actions';
import routes from './routes';
import GameManager from './libs/game';

export default {
    actions,
    routes,
    load(context) {
        const providers = context.providers;
        providers.gameManager = new GameManager();
    }
};
