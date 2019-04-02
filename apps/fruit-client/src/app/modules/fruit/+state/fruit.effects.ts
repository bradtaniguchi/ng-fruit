import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/nx';

import { FruitPartialState } from './fruit.reducer';
import {
  LoadFruit,
  FruitLoaded,
  FruitLoadError,
  FruitActionTypes
} from './fruit.actions';

@Injectable()
export class FruitEffects {
  @Effect() loadFruit$ = this.dataPersistence.fetch(
    FruitActionTypes.LoadFruit,
    {
      run: (action: LoadFruit, state: FruitPartialState) => {
        // Your custom REST 'load' logic goes here. For now just return an empty list...
        return new FruitLoaded([]);
      },

      onError: (action: LoadFruit, error) => {
        console.error('Error', error);
        return new FruitLoadError(error);
      }
    }
  );

  constructor(
    private actions$: Actions,
    private dataPersistence: DataPersistence<FruitPartialState>
  ) {}
}
