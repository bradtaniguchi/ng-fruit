import { Entity, FruitState } from './fruit.reducer';
import { fruitQuery } from './fruit.selectors';

describe('Fruit Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getFruitId = it => it['id'];

  let storeState;

  beforeEach(() => {
    const createFruit = (id: string, name = ''): Entity => ({
      id,
      name: name || `name-${id}`
    });
    storeState = {
      fruit: {
        list: [
          createFruit('PRODUCT-AAA'),
          createFruit('PRODUCT-BBB'),
          createFruit('PRODUCT-CCC')
        ],
        selectedId: 'PRODUCT-BBB',
        error: ERROR_MSG,
        loaded: true
      }
    };
  });

  describe('Fruit Selectors', () => {
    it('getAllFruit() should return the list of Fruit', () => {
      const results = fruitQuery.getAllFruit(storeState);
      const selId = getFruitId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelectedFruit() should return the selected Entity', () => {
      const result = fruitQuery.getSelectedFruit(storeState);
      const selId = getFruitId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it("getLoaded() should return the current 'loaded' status", () => {
      const result = fruitQuery.getLoaded(storeState);

      expect(result).toBe(true);
    });

    it("getError() should return the current 'error' storeState", () => {
      const result = fruitQuery.getError(storeState);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
