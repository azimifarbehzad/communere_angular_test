import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap, withLatestFrom } from 'rxjs/operators';

import { LocalStorageService } from '../../../core/core.module';

import { State } from '../users.state';
import {
  actionLocationsDeleteOne,
  actionLocationsUpsertOne
} from './locations.actions';
import { selectLocations } from './locations.selectors';

export const LOCATIONS_KEY = 'USERS.LOCATIONS';

@Injectable()
export class LocationsEffects {
  persistLocations = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actionLocationsUpsertOne, actionLocationsDeleteOne),
        withLatestFrom(this.store.pipe(select(selectLocations))),
        tap(([actions, locationsState]) =>
          this.localStorageService.setItem(LOCATIONS_KEY, locationsState)
        )
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private store: Store<State>,
    private localStorageService: LocalStorageService
  ) {}
}
