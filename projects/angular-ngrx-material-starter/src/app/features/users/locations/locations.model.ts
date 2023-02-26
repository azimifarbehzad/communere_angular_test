import { EntityState } from '@ngrx/entity';

export interface Location {
  id: string;
  name: string;
  position?: any;
  type: string;
  logo: string;
}
// For extending the LocationState Interface, we could always use
// export interface LocationState extends EntityState<Location> {}
export type LocationState = EntityState<Location>;
