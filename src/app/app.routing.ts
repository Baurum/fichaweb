import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {TimeRegistryComponent} from './time-registry/time-registry.component';

const appRoutes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'time_registry', component: TimeRegistryComponent},
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class AppRouting {
}
