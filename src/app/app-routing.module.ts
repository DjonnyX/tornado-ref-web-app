import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'signin',
    pathMatch: 'full'
  },
  {
    path: 'term-of-use',
    loadChildren: () =>
      import('@containers/auth/term-of-use/term-of-use.module').then(
        module => module.TermOfUseModule
      )
  },
  {
    path: 'signup',
    loadChildren: () =>
      import('@containers/auth/signup/signup.module').then(
        module => module.SignupModule
      )
  },
  {
    path: 'signin',
    loadChildren: () =>
      import('@containers/auth/signin/signin.module').then(
        module => module.SigninModule
      )
  },
  {
    path: 'reset-password',
    loadChildren: () =>
      import('@containers/auth/reset-password/reset-password.module').then(
        module => module.ResetPasswordModule
      )
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('@containers/admin/admin.module').then(
        module => module.AdminModule
      )
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
