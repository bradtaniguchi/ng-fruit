import { FruitLoaded } from './fruit.actions';
import {
  FruitState,
  Entity,
  initialState,
  fruitReducer
} from './fruit.reducer';

describe('Fruit Reducer', () => {
  const getFruitId = it => it['id'];
  let createFruit;

  beforeEach(() => {
    createFruit = (id: string, name = ''): Entity => ({
      id,
      name: name || `name-${id}`
    });
  });

  describe('valid Fruit actions ', () => {
    it('should return set the list of known Fruit', () => {
      const fruits = [createFruit('PRODUCT-AAA'), createFruit('PRODUCT-zzz')];
      const action = new FruitLoaded(fruits);
      const result: FruitState = fruitReducer(initialState, action);
      const selId: string = getFruitId(result.list[1]);

      expect(result.loaded).toBe(true);
      expect(result.list.length).toBe(2);
      expect(selId).toBe('PRODUCT-zzz');
    });
  });

  describe('unknown action', () => {
    it('should return the initial state', () => {
      const action = {} as any;
      const result = fruitReducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
