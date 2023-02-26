import { v4 as uuid } from 'uuid';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { Component, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { ROUTE_ANIMATIONS_ELEMENTS } from '../../../../../core/core.module';

import { State } from '../../../users.state';
import { Location } from '../../locations.model';
import {
  actionLocationsDeleteOne,
  actionLocationsUpsertOne
} from '../../locations.actions';
import {
  selectSelectedLocation,
  selectAllLocations
} from '../../locations.selectors';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';

@Component({
  selector: 'anms-list',
  templateUrl: './locations.list.component.html',
  styleUrls: ['./locations.list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LocationsListComponent {
  @ViewChild(MapInfoWindow) infoWindow: MapInfoWindow;

  // google maps zoom level
  zoom: number = 8;

  // initial center position for the map
  lat: number = 51.673858;
  lng: number = 7.815982;
  center: google.maps.LatLngLiteral = { lat: 51.673858, lng: 7.815982 };
  markerOptions: google.maps.MarkerOptions = { draggable: false };
  markerPositions: google.maps.LatLngLiteral[] = [];

  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;

  locations$: Observable<Location[]> = this.store.pipe(
    select(selectAllLocations)
  );
  selectedLocation$: Observable<Location | undefined> = this.store.pipe(
    select(selectSelectedLocation)
  );

  constructor(
    public store: Store<State>,
    public fb: FormBuilder,
    private router: Router
  ) {
    
  }

  edit(id: string) {
    this.router.navigate(['users/location/crud/' + id]);
  }

  addNew() {
    this.router.navigate(['users/location/crud/0']);
  }

  addMarker(event: google.maps.MapMouseEvent) {
    // this.markerPositions.push(event.latLng.toJSON());
  }
  openInfoWindow(marker: MapMarker, infoWindow: MapInfoWindow) {
    infoWindow.open(marker);
  }
  close(infoWindow: MapInfoWindow) {
    infoWindow.close();
  }
}
