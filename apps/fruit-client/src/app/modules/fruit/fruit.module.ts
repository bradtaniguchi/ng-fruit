import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FruitRoutingModule } from './fruit-routing.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {
  FRUIT_FEATURE_KEY,
  initialState as fruitInitialState,
  fruitReducer
} from './+state/fruit.reducer';
import { FruitEffects } from './+state/fruit.effects';
import { FruitFacade } from './+state/fruit.facade';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FruitRoutingModule,
    StoreModule.forFeature(FRUIT_FEATURE_KEY, fruitReducer, {
      initialState: fruitInitialState
    }),
    EffectsModule.forFeature([FruitEffects])
  ],
  providers: [FruitFacade]
})
export class FruitModule {}
