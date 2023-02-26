import {
  actionLocationsDeleteOne,
  actionLocationsUpsertOne
} from './locations.actions';

describe('Locations Actions', () => {
  it('should create ActionLocationsUpsertOne action', () => {
    const action = actionLocationsUpsertOne({
      location: {
        id: '123',
        name: 'Reactive Programming with Angular and ngrx',
        position: { lat: 12, lng: 12 },

        type: 1,

        logo: 'Learn to Harness the Power of Reactive Programming with RxJS and ngrx Extensions'
      }
    });
    expect(action.type).toEqual(actionLocationsUpsertOne.type);
    expect(action.location).toEqual(
      jasmine.objectContaining({
        id: '123',
        name: 'Reactive Programming with Angular and ngrx',
        position: { lat: 12, lng: 12 },

        type: 1,

        logo: 'Learn to Harness the Power of Reactive Programming with RxJS and ngrx Extensions'
      })
    );
  });

  it('should create ActionLocationsDeleteOne action', () => {
    const action = actionLocationsDeleteOne({ id: '1' });
    expect(action.type).toEqual(actionLocationsDeleteOne.type);
    expect(action.id).toEqual('1');
  });
});
