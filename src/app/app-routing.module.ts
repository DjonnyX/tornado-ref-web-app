import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'register',
    loadChildren: () =>
      import('@containers/registration/registration.module').then(
        module => module.RegistrationModule
      )
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('@containers/admin/admin.module').then(
        module => module.AdminModule
      )
  },
  {
    path: 'login',
    loadChildren: () =>
      import('@containers/login/login.module').then(
        module => module.LoginModule
      )
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
