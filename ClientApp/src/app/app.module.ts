import {
  CUSTOM_ELEMENTS_SCHEMA,
  NgModule,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { ModalComponent } from './shared/components/modal/modal.component';
import { AuthComponent } from './header/components/auth/auth.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './service/AuthService';
import { ListsComponent } from './pages/lists/lists.component';
import { DropdownUserComponent } from './shared/components/dropdown-user/dropdown-user.component';
import { HomeComponent } from './pages/home/home.component';
import { MembersComponent } from './pages/members/members.component';
import { MessagesComponent } from './pages/messages/messages.component';
import { MembersDetailComponent } from './pages/members/components/members-detail/members-detail.component';
import { ToastrModule } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RegistrationComponent } from './header/components/auth/components/registration/registration.component';
import { LoginComponent } from './header/components/auth/components/login/login.component';
import { NotFoundComponent } from './shared/components/errors/not-found/not-found.component';
import { ErrorIntercept } from './_interceptors/error.interceptor';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ModalComponent,
    AuthComponent,
    ListsComponent,
    DropdownUserComponent,
    HomeComponent,
    MembersComponent,
    MessagesComponent,
    MembersDetailComponent,
    LoginComponent,
    RegistrationComponent,
    NotFoundComponent,
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ToastrModule.forRoot({
    positionClass:'toast-top-right'
    }),
    NgbModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  providers: [AuthService, {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorIntercept,
    multi: true
  }],
  bootstrap: [AppComponent],
})
export class AppModule {}
