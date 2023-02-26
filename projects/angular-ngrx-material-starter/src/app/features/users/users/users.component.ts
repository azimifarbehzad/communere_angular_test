import { Store, select } from '@ngrx/store';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';

import {
  routeAnimations,
  selectIsAuthenticated
} from '../../../core/core.module';

import { State } from '../users.state';

@Component({
  selector: 'anms-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  animations: [routeAnimations],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersComponent implements OnInit {
  isAuthenticated$: Observable<boolean> | undefined;

  users = [
    { link: 'todos', label: 'anms.users.menu.todos' },
    { link: 'stock-market', label: 'anms.users.menu.stocks' },
    { link: 'theming', label: 'anms.users.menu.theming' },
    { link: 'crud', label: 'anms.users.menu.crud' },
    {
      link: 'simple-state-management',
      label: 'anms.users.menu.simple-state-management'
    },
    { link: 'form', label: 'anms.users.menu.form' },
    { link: 'notifications', label: 'anms.users.menu.notifications' },
    { link: 'elements', label: 'anms.users.menu.elements' },
    { link: 'authenticated', label: 'anms.users.menu.auth', auth: true }
  ];

  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    this.isAuthenticated$ = this.store.pipe(select(selectIsAuthenticated));
  }
}
