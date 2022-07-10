import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthComponent } from './header/components/auth/auth.component';
import { AuthGuard } from './header/components/auth/auth.guard';
import { LoginComponent } from './header/components/auth/components/login/login.component';
import { RegistrationComponent } from './header/components/auth/components/registration/registration.component';
import { HomeComponent } from './pages/home/home.component';
import { ListsComponent } from './pages/lists/lists.component';
import { MemberDetailComponent } from './pages/members/components/member-detail/member-detail.component';
import { MemberComponent } from './pages/members/member.component';

import { MessagesComponent } from './pages/messages/messages.component';
import { NotFoundComponent } from './shared/components/errors/not-found/not-found.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'lists', canActivate: [AuthGuard], component: ListsComponent },
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
      { path: 'registration', component: RegistrationComponent },
    ],
  },
  { path: 'members', component: MemberComponent },
  { path: 'members/:username', component: MemberDetailComponent },
  { path: 'messages', component: MessagesComponent },
  {path: '**', pathMatch: 'full',component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
