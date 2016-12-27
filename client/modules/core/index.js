import actions from './actions';
import routes from './routes';
import each from 'lodash/each';
import defaults from './configs/defaults';

export default {
    routes,
    actions,
    load(context) {
        each(defaults, (value, key) => {
            context.LocalState.set(key, value);
        });
    }
};
