import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { readFirst } from '@nrwl/nx/testing';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';

import { NxModule } from '@nrwl/nx';

import { FruitEffects } from './fruit.effects';
import { FruitFacade } from './fruit.facade';

import { fruitQuery } from './fruit.selectors';
import { LoadFruit, FruitLoaded } from './fruit.actions';
import {
  FruitState,
  Entity,
  initialState,
  fruitReducer
} from './fruit.reducer';

interface TestSchema {
  fruit: FruitState;
}

describe('FruitFacade', () => {
  let facade: FruitFacade;
  let store: Store<TestSchema>;
  let createFruit;

  beforeEach(() => {
    createFruit = (id: string, name = ''): Entity => ({
      id,
      name: name || `name-${id}`
    });
  });

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature('fruit', fruitReducer, { initialState }),
          EffectsModule.forFeature([FruitEffects])
        ],
        providers: [FruitFacade]
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          NxModule.forRoot(),
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule
        ]
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.get(Store);
      facade = TestBed.get(FruitFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async done => {
      try {
        let list = await readFirst(facade.allFruit$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.loadAll();

        list = await readFirst(facade.allFruit$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    /**
     * Use `FruitLoaded` to manually submit list for state management
     */
    it('allFruit$ should return the loaded list; and loaded flag == true', async done => {
      try {
        let list = await readFirst(facade.allFruit$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        store.dispatch(
          new FruitLoaded([createFruit('AAA'), createFruit('BBB')])
        );

        list = await readFirst(facade.allFruit$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(2);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });
  });
});
