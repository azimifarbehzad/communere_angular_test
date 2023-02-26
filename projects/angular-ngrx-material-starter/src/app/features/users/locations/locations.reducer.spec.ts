import { LocationState } from './locations.model';
import { locationReducer, initialState } from './locations.reducer';
import {
  actionLocationsDeleteOne,
  actionLocationsUpsertOne
} from './locations.actions';

describe('LocationReducer', () => {
  const TEST_INITIAL_STATE: LocationState = {
    ids: ['123'],
    entities: {
      '123': {
        id: '123',
        name: 'test',
        position: { lat: 12, lng: 12 },
        type: 1,

        logo: 'test'
      }
    }
  };

  it('should return the default state', () => {
    const action = {} as any;
    const state = locationReducer(undefined, action);

    expect(state).toBe(initialState);
  });

  it('should add a location', () => {
    const action = actionLocationsUpsertOne({
      location: {
        id: '1234',
        name: 'test',
        position: { lat: 12, lng: 12 },

        type: 1,

        logo: 'test'
      }
    });
    const state = locationReducer(TEST_INITIAL_STATE, action);

    expect(state.ids.length).toEqual(2);
    expect(state.entities['1234']?.name).toEqual('test');
  });

  it('should update a location', () => {
    const id = TEST_INITIAL_STATE.ids[0] as string;
    const action = actionLocationsUpsertOne({
      location: {
        id: id,
        name: 'updated',
        position: { lat: 12, lng: 12 },

        type: 2,
        logo: 'updated'
      }
    });

    const state = locationReducer(TEST_INITIAL_STATE, action);
    expect(state.entities[id]).toEqual(
      jasmine.objectContaining({
        title: 'updated',
        author: 'updated',
        description: 'updated'
      })
    );
  });

  it('should remove a location', () => {
    const id = TEST_INITIAL_STATE.ids[0] as string;
    const action = actionLocationsDeleteOne({ id });
    const state = locationReducer(TEST_INITIAL_STATE, action);
    expect(state.entities[id]).toBe(undefined);
  });
});
