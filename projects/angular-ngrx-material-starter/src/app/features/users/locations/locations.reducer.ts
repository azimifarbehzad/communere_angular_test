import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';

import { Location, LocationState } from './locations.model';
import {
  actionLocationsDeleteOne,
  actionLocationsUpsertOne
} from './locations.actions';
import { Action, createReducer, on } from '@ngrx/store';

export function sortByTitle(a: Location, b: Location): number {
  return a.name.localeCompare(b.name);
}

export const locationAdapter: EntityAdapter<Location> =
  createEntityAdapter<Location>({
    sortComparer: sortByTitle
  });

export const initialState: LocationState = locationAdapter.getInitialState({
  ids: ['123'],
  entities: {
    '123': {
      id: '123',
      name: 'Reactive Programming with Angular and ngrx',
      position: { lat: 51.673858, lng: 7.815982},
      type: 1,

      logo: ''
    }
  }
});

const reducer = createReducer(
  initialState,
  on(actionLocationsUpsertOne, (state, { location }) =>
    locationAdapter.upsertOne(location, state)
  ),
  on(actionLocationsDeleteOne, (state, { id }) =>
    locationAdapter.removeOne(id, state)
  )
);

export function locationReducer(
  state: LocationState | undefined,
  action: Action
) {
  return reducer(state, action);
}
