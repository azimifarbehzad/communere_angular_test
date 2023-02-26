import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

import { SharedModule } from '../../../../../shared/shared.module';

import { LocationsListComponent } from './locations.list.component';
import {
  selectAllLocations,
  selectSelectedLocation
} from '../../locations.selectors';

describe('LocationsListComponent', () => {
  let component: LocationsListComponent;
  let fixture: ComponentFixture<LocationsListComponent>;
  let store: MockStore;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [
          SharedModule,
          NoopAnimationsModule,
          RouterTestingModule,
          TranslateModule.forRoot()
        ],
        providers: [provideMockStore()],
        declarations: [LocationsListComponent]
      }).compileComponents();
      store = TestBed.inject(MockStore);
      store.overrideSelector(selectAllLocations, []);
      store.overrideSelector(selectSelectedLocation, undefined);
      fixture = TestBed.createComponent(LocationsListComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
