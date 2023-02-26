import * as assert from 'assert';
import { Store } from '@ngrx/store';
import { EMPTY, of } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';

import { LocalStorageService } from '../../../core/core.module';

import { LocationState } from './locations.model';
import { Actions, getEffectsMetadata } from '@ngrx/effects';
import { LocationsEffects, LOCATIONS_KEY } from './locations.effects';
import {
  actionLocationsDeleteOne,
  actionLocationsUpsertOne
} from './locations.actions';

const scheduler = new TestScheduler((actual, expected) =>
  assert.deepStrictEqual(actual, expected)
);

describe('LocationsEffects', () => {
  describe('persistLocations', () => {
    const locationsState: LocationState = {
      entities: {
        '1': {
          name: 'Author',
          position: { lat: 51.673858, lng: 7.815982 },

          type: "1",

          id: '1',
          logo: 'Title'
        }
      },
      ids: ['1']
    };
    let localStorage: LocalStorageService;
    let store: Store<any>;

    beforeEach(() => {
      localStorage = jasmine.createSpyObj('localStorage', ['setItem']);
      store = of({
        examples: {
          locations: locationsState
        }
      }) as any;
    });

    it('should not dispatch any actions', () => {
      const actions = new Actions(EMPTY);
      const effects = new LocationsEffects(actions, store, localStorage);
      const metadata = getEffectsMetadata(effects);

      expect(metadata.persistLocations?.dispatch).toEqual(false);
    });

    it('should call setItem on LocalStorageService for delete one action', () => {
      scheduler.run((helpers) => {
        const { cold } = helpers;
        const action = actionLocationsDeleteOne({ id: '1' });
        const source = cold('a', { a: action });
        const actions = new Actions(source);
        const effects = new LocationsEffects(actions, store, localStorage);

        effects.persistLocations.subscribe(() => {
          expect(localStorage.setItem).toHaveBeenCalledWith(
            LOCATIONS_KEY,
            locationsState
          );
        });
      });
    });

    it('should call setItem on LocalStorageService for upsert one action', () => {
      scheduler.run((helpers) => {
        const { cold } = helpers;
        const action = actionLocationsUpsertOne({ location: {} as any });
        const source = cold('a', { a: action });
        const actions = new Actions(source);
        const effects = new LocationsEffects(actions, store, localStorage);

        effects.persistLocations.subscribe(() => {
          expect(localStorage.setItem).toHaveBeenCalledWith(
            LOCATIONS_KEY,
            locationsState
          );
        });
      });
    });
  });
});
