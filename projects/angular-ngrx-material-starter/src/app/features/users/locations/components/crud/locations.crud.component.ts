import { v4 as uuid } from 'uuid';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, pipe } from 'rxjs';

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
import { tap } from 'rxjs/operators';

@Component({
  selector: 'anms-crud',
  templateUrl: './locations.crud.component.html',
  styleUrls: ['./locations.crud.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LocationsCrudComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;

  locationFormGroup = this.fb.group(LocationsCrudComponent.createLocation());
  locations$: Observable<Location[]> = this.store.pipe(
    select(selectAllLocations)
  );
  selectedLocation$: Observable<Location | undefined> = this.store.pipe(
    select(selectSelectedLocation)
  );
  // google maps zoom level
  zoom: number = 8;
  currentLocation: google.maps.LatLngLiteral = {
    lat: 23.944787361827622,
    lng: 11.709205627441403
  };
  // initial center position for the map
  lat: number = 51.673858;
  lng: number = 7.815982;
  center: google.maps.LatLngLiteral = {
    lat: 51.673858,
    lng: 7.815982
  };
  markerOptions: google.maps.MarkerOptions = { draggable: false };

  constructor(
    public store: Store<State>,
    public fb: FormBuilder,
    private router: Router
  ) {
    // this.selectedLocation$.subscribe(
    //   pipe((l: Location | undefined) => {
    //     alert(l);
    //     if (l != undefined) {
    //       this.locationFormGroup.setValue(
    //         LocationsCrudComponent.editLocation(l)
    //       );
    //       this.currentLocation = l?.position;
    //     }
    //   })
    // );
  }
  ngOnInit() {
    this.selectedLocation$.subscribe(
      pipe((l: Location | undefined) => {
      
        if (l != undefined) {
          this.locationFormGroup.setValue(
            LocationsCrudComponent.editLocation(l)
          );
          this.currentLocation = l?.position;
        }
      })
    );
  }
  static createLocation(): Location {
    return {
      id: uuid(),
      name: '',

      type: 'option1',
      position: { lat: 51.673858, lng: 7.815982 },
      logo: ''
    };
  }
  static editLocation(location: Location | undefined): any {
    if (location != undefined)
      return {
        id: location.id,
        name: location.name,
        type: location.type,
        position: location.position,
        logo: location.logo
      };
  }

  cancelEditing() {
    this.router.navigate(['users/location/list']);
  }

  save() {
    if (this.locationFormGroup.valid) {
      const location = this.locationFormGroup.value;
      this.store.dispatch(actionLocationsUpsertOne({ location }));
      this.router.navigate(['users/location/list']);
    }
  }

  onUploadChange(evt: any) {
    const file = evt.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = this.handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
  }

  handleReaderLoaded(e: any) {
    this.locationFormGroup.controls['logo'].patchValue(
      'data:image/png;base64,' + btoa(e.target.result)
    );
  }
  addMarker(event: google.maps.MapMouseEvent) {
    this.locationFormGroup.controls['position'].patchValue(
      event.latLng.toJSON()
    );
    this.currentLocation = { lat: event.latLng.lat(), lng: event.latLng.lng() };
  }
}
