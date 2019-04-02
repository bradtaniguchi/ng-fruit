import { Injectable } from '@angular/core';

import { select, Store } from '@ngrx/store';

import { FruitPartialState } from './fruit.reducer';
import { fruitQuery } from './fruit.selectors';
import { LoadFruit } from './fruit.actions';

@Injectable()
export class FruitFacade {
  loaded$ = this.store.pipe(select(fruitQuery.getLoaded));
  allFruit$ = this.store.pipe(select(fruitQuery.getAllFruit));
  selectedFruit$ = this.store.pipe(select(fruitQuery.getSelectedFruit));

  constructor(private store: Store<FruitPartialState>) {}

  loadAll() {
    this.store.dispatch(new LoadFruit());
  }
}
