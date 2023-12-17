import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUsersComponent } from './add-users/add-users.component';
import { ListUserComponent } from './list-user/list-user.component';

const routes: Routes = [
  {path : '' , children:[
   {path : 'list-user' , component : ListUserComponent},
   {path : 'add-user' , component : AddUsersComponent}

  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
