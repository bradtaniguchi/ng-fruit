import { Action } from '@ngrx/store';
import { Entity } from './fruit.reducer';

export enum FruitActionTypes {
  LoadFruit = '[Fruit] Load Fruit',
  FruitLoaded = '[Fruit] Fruit Loaded',
  FruitLoadError = '[Fruit] Fruit Load Error'
}

export class LoadFruit implements Action {
  readonly type = FruitActionTypes.LoadFruit;
}

export class FruitLoadError implements Action {
  readonly type = FruitActionTypes.FruitLoadError;
  constructor(public payload: any) {}
}

export class FruitLoaded implements Action {
  readonly type = FruitActionTypes.FruitLoaded;
  constructor(public payload: Entity[]) {}
}

export type FruitAction = LoadFruit | FruitLoaded | FruitLoadError;

export const fromFruitActions = {
  LoadFruit,
  FruitLoaded,
  FruitLoadError
};
