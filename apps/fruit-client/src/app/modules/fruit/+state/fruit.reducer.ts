import { FruitAction, FruitActionTypes } from './fruit.actions';

export const FRUIT_FEATURE_KEY = 'fruit';

/**
 * Interface for the 'Fruit' data used in
 *  - FruitState, and
 *  - fruitReducer
 *
 *  Note: replace if already defined in another module
 */

/* tslint:disable:no-empty-interface */
export interface Entity {}

export interface FruitState {
  list: Entity[]; // list of Fruit; analogous to a sql normalized table
  selectedId?: string | number; // which Fruit record has been selected
  loaded: boolean; // has the Fruit list been loaded
  error?: any; // last none error (if any)
}

export interface FruitPartialState {
  readonly [FRUIT_FEATURE_KEY]: FruitState;
}

export const initialState: FruitState = {
  list: [],
  loaded: false
};

export function fruitReducer(
  state: FruitState = initialState,
  action: FruitAction
): FruitState {
  switch (action.type) {
    case FruitActionTypes.FruitLoaded: {
      state = {
        ...state,
        list: action.payload,
        loaded: true
      };
      break;
    }
  }
  return state;
}
