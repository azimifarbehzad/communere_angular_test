import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

import { SharedModule } from '../../../../../shared/shared.module';

import { LocationsCrudComponent } from './locations.crud.component';
import {
  selectAllLocations,
  selectSelectedLocation
} from '../../locations.selectors';

describe('LocationsCrudComponent', () => {
  let component: LocationsCrudComponent;
  let fixture: ComponentFixture<LocationsCrudComponent>;
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
        declarations: [LocationsCrudComponent]
      }).compileComponents();
      store = TestBed.inject(MockStore);
      store.overrideSelector(selectAllLocations, []);
      store.overrideSelector(selectSelectedLocation, undefined);
      fixture = TestBed.createComponent(LocationsCrudComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
