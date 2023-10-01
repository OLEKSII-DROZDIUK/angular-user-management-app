import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user-list.component';
import { RouterModule } from '@angular/router';
import { LoaderComponent } from '@components/loader/loader.component';

@NgModule({
  declarations: [UserListComponent, LoaderComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: UserListComponent,
      },
    ]),
  ],
})
export class AgentListModule {}
