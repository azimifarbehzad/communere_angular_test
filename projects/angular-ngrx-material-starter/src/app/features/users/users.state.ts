import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import { AppState } from '../../core/core.module';
import { locationReducer } from './locations/locations.reducer';
import { LocationState } from './locations/locations.model';

export const FEATURE_NAME = 'users';
export const selectUsers = createFeatureSelector<State, UsersState>(
  FEATURE_NAME
);
export const reducers: ActionReducerMap<UsersState> = {
  locations: locationReducer
};

export interface UsersState {
  locations: LocationState;
}

export interface State extends AppState {
  users: UsersState;
}
