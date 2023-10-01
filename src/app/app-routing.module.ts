import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ForbiddenComponent } from './pages/forbidden/forbidden.component';

const routes: Routes = [
  { path: '', redirectTo: 'user-list', pathMatch: 'full' },
  {
    path: 'user-list',
    loadChildren: () =>
      import('./pages/user-list/user-list.module').then(
        (m) => m.AgentListModule
      ),
  },
  {
    path: 'user-view',
    loadChildren: () =>
      import('./pages/user-view/user-view.module').then(
        (m) => m.UserViewModule
      ),
  },
  {
    path: '403.html',
    component: ForbiddenComponent,
  },
  {
    path: '404.html',
    component: NotFoundComponent,
  },
  {
    path: '**',
    redirectTo: 'user-list',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
