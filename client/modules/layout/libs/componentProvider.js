/**
 * Simple component switcher, which is returning one of the provided components based on the
 * layoutType field in LocalState.
 */
export class ComponentProvider {
    constructor(
        { LocalState }
    ) {
        this._localState = LocalState;
    }

    getComponent(normal) {
      return normal;
    }
}

export default (context) => new ComponentProvider(context);
