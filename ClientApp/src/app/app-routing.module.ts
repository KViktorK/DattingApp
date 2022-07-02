import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './header/components/auth/auth.component';
import { AuthGuard } from './header/components/auth/auth.guard';
import { HomeComponent } from './pages/home/home.component';
import { ListsComponent } from './pages/lists/lists.component';
import { MembersDetailComponent } from './pages/members/components/members-detail/members-detail.component';
import { MembersComponent } from './pages/members/members.component';
import { MessagesComponent } from './pages/messages/messages.component';

const routes: Routes = [
  {path: '', redirectTo:'/home', pathMatch:'full'},
  {path:'home', component:HomeComponent},
  { path: 'lists', canActivate: [AuthGuard], component: ListsComponent },
  { path: 'auth', component: AuthComponent },
  {path:'members',component:MembersComponent},
  {path:'member/:id',component:MembersDetailComponent},
  {path:'messages',component:MessagesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
