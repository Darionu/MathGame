import localStateKeys from '/lib/constants/localStateKeys';
import OpponentTypes from '/lib/constants/opponentTypes';

const defaults = {
    [localStateKeys.language]: 'en',
    [localStateKeys.layout]: 'default',
    [localStateKeys.chosenOpponent]: OpponentTypes.player
};

export default defaults;
