import { TestBed, async } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';

import { NxModule } from '@nrwl/nx';
import { DataPersistence } from '@nrwl/nx';
import { hot } from '@nrwl/nx/testing';

import { FruitEffects } from './fruit.effects';
import { LoadFruit, FruitLoaded } from './fruit.actions';

describe('FruitEffects', () => {
  let actions: Observable<any>;
  let effects: FruitEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NxModule.forRoot(),
        StoreModule.forRoot({}),
        EffectsModule.forRoot([])
      ],
      providers: [
        FruitEffects,
        DataPersistence,
        provideMockActions(() => actions)
      ]
    });

    effects = TestBed.get(FruitEffects);
  });

  describe('loadFruit$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: new LoadFruit() });
      expect(effects.loadFruit$).toBeObservable(
        hot('-a-|', { a: new FruitLoaded([]) })
      );
    });
  });
});
