import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {RouterModule} from '@angular/router';
import {AppRouting} from './app.routing';
import { HeaderComponent } from './header/header.component';
import {ReactiveFormsModule} from '@angular/forms';
import { TimeRegistryComponent } from './time-registry/time-registry.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  imports: [
    BrowserModule,
    RouterModule,
    AppRouting,
    ReactiveFormsModule,
    NgbModule,
    HttpClientModule,
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    TimeRegistryComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
