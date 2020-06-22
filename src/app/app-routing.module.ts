import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'signin',
    pathMatch: 'full'
  },
  {
    path: 'signup',
    loadChildren: () =>
      import('@containers/signup/signup.module').then(
        module => module.SignupModule
      )
  },
  {
    path: 'signin',
    loadChildren: () =>
      import('@containers/signin/signin.module').then(
        module => module.SigninModule
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
