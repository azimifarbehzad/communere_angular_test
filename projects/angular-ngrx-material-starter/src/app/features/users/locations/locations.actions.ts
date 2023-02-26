import { createAction, props } from '@ngrx/store';
import { Location } from './locations.model';

export const actionLocationsUpsertOne = createAction(
  '[Locations] Upsert One',
  props<{ location: Location }>()
);

export const actionLocationsDeleteOne = createAction(
  '[Locations] Delete One',
  props<{ id: string }>()
);
