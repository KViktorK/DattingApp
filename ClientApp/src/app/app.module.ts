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
import { MessagesComponent } from './pages/messages/messages.component';
import { ToastrModule } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RegistrationComponent } from './header/components/auth/components/registration/registration.component';
import { LoginComponent } from './header/components/auth/components/login/login.component';
import { NotFoundComponent } from './shared/components/errors/not-found/not-found.component';
import { ErrorIntercept } from './_interceptors/error.interceptor';
import { MemberListComponent } from './pages/members/components/member-list/member-list.component';
import { MemberDetailComponent } from './pages/members/components/member-detail/member-detail.component';
import { MembersService } from './service/MembersService';
import { MemberComponent } from './pages/members/member.component';
import { MemberCardComponent } from './pages/members/components/member-card/member-card.component';
import { JwtInterceptor } from './_interceptors/jwt.interceptor';
import { MemberDetailCardComponent } from './pages/members/components/member-detail/components/member-detail-card/member-detail-card.component';
import { MemberMoreInfoComponent } from './pages/members/components/member-detail/components/member-more-info/member-more-info.component';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ModalComponent,
    AuthComponent,
    ListsComponent,
    DropdownUserComponent,
    HomeComponent,
    HeaderComponent,
    MessagesComponent,
    MemberDetailComponent,
    LoginComponent,
    RegistrationComponent,
    NotFoundComponent,
    MemberListComponent,
    MemberComponent,
    MemberCardComponent,
    MemberDetailCardComponent,
    MemberMoreInfoComponent,
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
    }),
    NgbModule,
    NgxGalleryModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorIntercept,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
