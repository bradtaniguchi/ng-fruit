import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FRUIT_FEATURE_KEY, FruitState } from './fruit.reducer';

// Lookup the 'Fruit' feature state managed by NgRx
const getFruitState = createFeatureSelector<FruitState>(FRUIT_FEATURE_KEY);

const getLoaded = createSelector(
  getFruitState,
  (state: FruitState) => state.loaded
);
const getError = createSelector(
  getFruitState,
  (state: FruitState) => state.error
);

const getAllFruit = createSelector(
  getFruitState,
  getLoaded,
  (state: FruitState, isLoaded) => {
    return isLoaded ? state.list : [];
  }
);
const getSelectedId = createSelector(
  getFruitState,
  (state: FruitState) => state.selectedId
);
const getSelectedFruit = createSelector(
  getAllFruit,
  getSelectedId,
  (fruit, id) => {
    const result = fruit.find(it => it['id'] === id);
    return result ? Object.assign({}, result) : undefined;
  }
);

export const fruitQuery = {
  getLoaded,
  getError,
  getAllFruit,
  getSelectedFruit
};
