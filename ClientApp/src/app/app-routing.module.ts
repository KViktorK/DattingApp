import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './header/components/auth/auth.component';
import { AuthGuard } from './header/components/auth/auth.guard';
import { ListComponent } from './pages/list/list.component';

const routes: Routes = [
  { path: 'list', canActivate: [AuthGuard], component: ListComponent },
  { path: 'auth', component: AuthComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
