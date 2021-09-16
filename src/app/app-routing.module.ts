import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmptyPageComponent } from '@components/empty-page/empty-page.component';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'admin',
    pathMatch: 'full'
  },
  {
    path: 'term-of-use',
    loadChildren: () =>
      import('@containers/auth/term-of-use/term-of-use.module').then(
        module => module.TermOfUseModule,
      )
  },
  {
    path: 'signup',
    loadChildren: () =>
      import('@containers/auth/signup/signup.module').then(
        module => module.SignupModule,
      )
  },
  {
    path: 'signin',
    loadChildren: () =>
      import('@containers/auth/signin/signin.module').then(
        module => module.SigninModule,
      )
  },
  {
    path: 'forgot-password',
    loadChildren: () =>
      import('@containers/auth/forgot-password/forgot-password.module').then(
        module => module.ForgotPasswordModule,
      )
  },
  {
    path: 'forgot-password-result',
    loadChildren: () =>
      import('@containers/auth/forgot-password-result/forgot-password-result.module').then(
        module => module.ForgotPasswordResultModule,
      )
  },
  {
    path: 'reset-password',
    loadChildren: () =>
      import('@containers/auth/reset-password/reset-password.module').then(
        module => module.ResetPasswordModule,
      )
  },
  {
    path: 'reset-password-result',
    loadChildren: () =>
      import('@containers/auth/reset-password-result/reset-password-result.module').then(
        module => module.ResetPasswordResultModule,
      )
  },
  {
    path: 'change-email',
    loadChildren: () =>
      import('@containers/auth/change-email/change-email.module').then(
        module => module.ChangeEmailModule,
      )
  },
  {
    path: 'change-email-result',
    loadChildren: () =>
      import('@containers/auth/change-email-result/change-email-result.module').then(
        module => module.ChangeEmailResultModule,
      )
  },
  {
    path: 'reset-email',
    loadChildren: () =>
      import('@containers/auth/reset-email/reset-email.module').then(
        module => module.ResetEmailModule,
      )
  },
  {
    path: 'reset-email-result',
    loadChildren: () =>
      import('@containers/auth/reset-email-result/reset-email-result.module').then(
        module => module.ResetEmailResultModule,
      )
  },
  {
    path: 'auth-error',
    loadChildren: () =>
      import('@containers/auth/auth-error/auth-error.module').then(
        module => module.AuthErrorModule,
      )
  },
  {
    path: 'cookie-term-of-use',
    loadChildren: () =>
      import('@components/cookie-term-of-use/cookie-term-of-use.module').then(
        module => module.CookieTermOfUseModule,
      ),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('@containers/admin/admin.module').then(
        module => module.AdminModule,
      ),
    canActivate: [
      AuthGuard,
    ]
  },
  {
    path: '**',
    redirectTo: 'page-not-found',
  },
  {
    path: 'page-not-found',
    component: EmptyPageComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
