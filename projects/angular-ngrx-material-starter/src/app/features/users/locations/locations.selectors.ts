import { createSelector } from '@ngrx/store';

import { selectRouterState } from '../../../core/core.module';
import { selectUsers, UsersState } from '../users.state';

import { locationAdapter } from './locations.reducer';

const { selectEntities, selectAll } = locationAdapter.getSelectors();

export const selectLocations = createSelector(
  selectUsers,
  (state: UsersState) => state.locations
);

export const selectAllLocations = createSelector(selectLocations, selectAll);
export const selectLocationsEntities = createSelector(selectLocations, selectEntities);

export const selectSelectedLocation = createSelector(
  selectLocationsEntities,
  selectRouterState,
  (entities, params) => params && entities[params.state.params.id]
);
