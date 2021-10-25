import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminContainer } from './admin.container';
import { SelectorTypes, AdTypes, TerminalTypes } from '@djonnyx/tornado-types';
import { AllowAdminGuard, AllowCheckuesGuard } from '@guards';
import { environment } from '@environments';
import { EmptyPageComponent } from '@components/empty-page/empty-page.component';
import { AccessGuard } from './guards/access.guard';

const routes: Routes = [
  {
    path: '',
    component: AdminContainer,
    children: [
    ]
  }
];

const ADMIN_ROUTES: Routes = [
  {
    path: 'licenses',
    loadChildren: () =>
      import('@containers/licenses-editor/licenses-editor.module').then(
        module => module.LicensesEditorModule,
      ),
    canActivate: [AccessGuard, AllowAdminGuard],
  },
  {
    path: 'license-types',
    loadChildren: () =>
      import('@containers/license-types-editor/license-types-editor.module').then(
        module => module.LicenseTypesEditorModule,
      ),
    canActivate: [AccessGuard, AllowAdminGuard],
  },
  {
    path: 'applications',
    loadChildren: () =>
      import('@containers/applications-editor/applications-editor.module').then(
        module => module.ApplicationsEditorModule,
      ),
    canActivate: [AccessGuard, AllowAdminGuard],
  },
  {
    path: 'tarifs',
    loadChildren: () =>
      import('@containers/tarifs-editor/tarifs-editor.module').then(
        module => module.TarifsEditorModule,
      ),
    canActivate: [AccessGuard, AllowAdminGuard],
  },
  {
    path: 'integrations',
    loadChildren: () =>
      import('@containers/integrations-editor/integrations-editor.module').then(
        module => module.IntegrationsEditorModule,
      ),
    canActivate: [AccessGuard, AllowAdminGuard],
  },
];

const CMS_ROUTES: Routes = [
  {
    path: 'dashboard',
    loadChildren: () =>
      import('@containers/dashboard/dashboard.module').then(
        module => module.DashboardModule,
      ),
    canActivate: [AccessGuard],
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('@containers/profile/profile.module').then(
        module => module.ProfileModule,
      ),
    canActivate: [AccessGuard],
  },
  {
    path: 'accounts',
    loadChildren: () =>
      import('@containers/accounts-editor/accounts-editor.module').then(
        module => module.AccountsEditorModule,
      ),
    canActivate: [AccessGuard],
  },
  {
    path: 'roles',
    loadChildren: () =>
      import('@containers/roles-editor/roles-editor.module').then(
        module => module.RolesEditorModule,
      ),
    canActivate: [AccessGuard],
  },
  {
    path: 'menu-tree',
    loadChildren: () =>
      import('@containers/menu-tree-editor/menu-tree-editor.module').then(
        module => module.MenuTreeEditorModule,
      ),
    canActivate: [AccessGuard],
  },
  {
    path: 'menu-categories',
    loadChildren: () =>
      import('@containers/selectors-editor/selectors-editor.module').then(
        module => module.SelectorsEditorModule,
      ),
    data: {
      type: SelectorTypes.MENU_CATEGORY,
      path: 'menu-categories',
    },
    canActivate: [AccessGuard],
  },
  {
    path: 'schema-categories',
    loadChildren: () =>
      import('@containers/selectors-editor/selectors-editor.module').then(
        module => module.SelectorsEditorModule,
      ),
    data: {
      type: SelectorTypes.SCHEMA_CATEGORY,
      path: 'schema-categories',
    },
    canActivate: [AccessGuard],
  },
  {
    path: 'themes-kiosk',
    loadChildren: () =>
      import('@containers/app-themes-editor/app-themes-editor.module').then(
        module => module.AppThemesEditorModule,
      ),
    data: {
      type: TerminalTypes.KIOSK,
      path: 'themes-kiosk',
    },
    canActivate: [AccessGuard],
  },
  {
    path: 'themes-order-picker',
    loadChildren: () =>
      import('@containers/app-themes-editor/app-themes-editor.module').then(
        module => module.AppThemesEditorModule,
      ),
    data: {
      type: TerminalTypes.ORDER_PICKER,
      path: 'themes-order-picker',
    },
    canActivate: [AccessGuard],
  },
  {
    path: 'themes-eq',
    loadChildren: () =>
      import('@containers/app-themes-editor/app-themes-editor.module').then(
        module => module.AppThemesEditorModule,
      ),
    data: {
      type: TerminalTypes.EQUEUE,
      path: 'themes-eq',
    },
    canActivate: [AccessGuard],
  },
  {
    path: 'intros',
    loadChildren: () =>
      import('@containers/ads-editor/ads-editor.module').then(
        module => module.AdsEditorModule,
      ),
    data: {
      type: AdTypes.INTRO,
      path: 'intros',
    },
    canActivate: [AccessGuard],
  },
  {
    path: 'banners',
    loadChildren: () =>
      import('@containers/ads-editor/ads-editor.module').then(
        module => module.AdsEditorModule,
      ),
    data: {
      type: AdTypes.BANNER,
      path: 'banners',
    },
    canActivate: [AccessGuard],
  },
  {
    path: 'service-unavailable-intros',
    loadChildren: () =>
      import('@containers/ads-editor/ads-editor.module').then(
        module => module.AdsEditorModule,
      ),
    data: {
      type: AdTypes.SERVICE_UNAVAILABLE,
      path: 'service-unavailable-intros',
    },
    canActivate: [AccessGuard],
  },
  {
    path: 'products',
    loadChildren: () =>
      import('@containers/products-editor/products-editor.module').then(
        module => module.ProductsEditorModule,
      ),
    canActivate: [AccessGuard],
  },
  {
    path: 'currencies',
    loadChildren: () =>
      import('@containers/currencies-editor/currencies-editor.module').then(
        module => module.CurrenciesEditorModule,
      ),
    canActivate: [AccessGuard],
  },
  {
    path: 'checkues',
    loadChildren: () =>
      import('@containers/checkues-editor/checkues-editor.module').then(
        module => module.CheckuesEditorModule,
      ),
    canActivate: [AccessGuard, AllowCheckuesGuard],
  },
  {
    path: 'tags',
    loadChildren: () =>
      import('@containers/tags-editor/tags-editor.module').then(
        module => module.TagsEditorModule,
      ),
    canActivate: [AccessGuard],
  },
  {
    path: 'business-periods',
    loadChildren: () =>
      import('@containers/business-periods-editor/business-periods-editor.module').then(
        module => module.BusinessPeriodsEditorModule,
      ),
    canActivate: [AccessGuard],
  },
  {
    path: 'assets',
    loadChildren: () =>
      import('@containers/assets-editor/assets-editor.module').then(
        module => module.AssetsEditorModule,
      ),
    canActivate: [AccessGuard],
  },
  {
    path: 'order-types',
    loadChildren: () =>
      import('@containers/order-types-editor/order-types-editor.module').then(
        module => module.OrderTypesEditorModule,
      ),
    canActivate: [AccessGuard],
  },
  {
    path: 'languages',
    loadChildren: () =>
      import('@containers/languages-editor/languages-editor.module').then(
        module => module.LanguagesEditorModule,
      ),
    canActivate: [AccessGuard],
  },
  {
    path: 'stores',
    loadChildren: () =>
      import('@containers/stores-editor/stores-editor.module').then(
        module => module.StoresEditorModule,
      ),
    canActivate: [AccessGuard],
  },
  {
    path: 'terminals',
    loadChildren: () =>
      import('@containers/terminals-editor/terminals-editor.module').then(
        module => module.TerminalsEditorModule,
      ),
    canActivate: [AccessGuard],
  },
  {
    path: 'backups',
    loadChildren: () =>
      import('@containers/backups/backups.module').then(
        module => module.BackupsModule,
      ),
    canActivate: [AccessGuard],
  },
  {
    path: 'licenses-account',
    loadChildren: () =>
      import('@containers/licenses-account-editor/licenses-account-editor.module').then(
        module => module.LicensesAccountEditorModule,
      ),
    canActivate: [AccessGuard],
  },
];

switch (environment.buildType) {
  case "all":
    routes[0].children.push(...ADMIN_ROUTES);
    routes[0].children.push(...CMS_ROUTES);
    break;
  case "cms":
    routes[0].children.push(...CMS_ROUTES);
    break;
  case "admin":
    routes[0].children.push(...ADMIN_ROUTES);
    break;
}

routes[0].children.push(
  {
    path: '**',
    redirectTo: 'page-not-found',
  },
  {
    path: 'page-not-found',
    component: EmptyPageComponent,
  }
);

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class AdminRoutingModule { }
