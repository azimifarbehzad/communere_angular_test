import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from '../../core/core.module';
import { UsersComponent } from './users/users.component';

import { LocationsCrudComponent } from './locations/components/crud/locations.crud.component';
import { LocationsListComponent } from './locations/components/list/locations.list.component';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    children: [
      {
        path: '',
        redirectTo: 'location/list',
        pathMatch: 'full'
      },
      {
        path: 'location/crud/:id',
        component: LocationsCrudComponent,
        data: { title: 'anms.users.menu.location' }
      },
      {
        path: 'location/list',
        component: LocationsListComponent,
        data: { title: 'anms.users.menu.location' }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule {}
