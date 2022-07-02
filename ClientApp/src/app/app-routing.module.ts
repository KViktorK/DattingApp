import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './header/components/auth/auth.component';
import { AuthGuard } from './header/components/auth/auth.guard';
import { HomeComponent } from './pages/home/home.component';
import { ListComponent } from './pages/list/list.component';

const routes: Routes = [
  {path: '', redirectTo:'/home', pathMatch:'full'},
  {path:'home', component:HomeComponent},
  { path: 'list', canActivate: [AuthGuard], component: ListComponent },
  { path: 'auth', component: AuthComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
