import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminContainer } from './admin.container';
import { SelectorTypes, AdTypes, TerminalTypes } from '@djonnyx/tornado-types';
import { AllowAdminGuard, AllowCheckuesGuard } from '@guards';

const routes: Routes = [
  {
    path: '',
    component: AdminContainer,
    children: [
      {
        path: 'profile',
        loadChildren: () =>
          import('@containers/profile/profile.module').then(
            module => module.ProfileModule,
          )
      },
      {
        path: 'menu-tree',
        loadChildren: () =>
          import('@containers/menu-tree-editor/menu-tree-editor.module').then(
            module => module.MenuTreeEditorModule,
          )
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
      },
      {
        path: 'products',
        loadChildren: () =>
          import('@containers/products-editor/products-editor.module').then(
            module => module.ProductsEditorModule,
          )
      },
      {
        path: 'currencies',
        loadChildren: () =>
          import('@containers/currencies-editor/currencies-editor.module').then(
            module => module.CurrenciesEditorModule,
          )
      },
      {
        path: 'checkues',
        loadChildren: () =>
          import('@containers/checkues-editor/checkues-editor.module').then(
            module => module.CheckuesEditorModule,
          ),
        canActivate: [AllowCheckuesGuard],
      },
      {
        path: 'tags',
        loadChildren: () =>
          import('@containers/tags-editor/tags-editor.module').then(
            module => module.TagsEditorModule,
          )
      },
      {
        path: 'business-periods',
        loadChildren: () =>
          import('@containers/business-periods-editor/business-periods-editor.module').then(
            module => module.BusinessPeriodsEditorModule,
          )
      },
      {
        path: 'assets',
        loadChildren: () =>
          import('@containers/assets-editor/assets-editor.module').then(
            module => module.AssetsEditorModule,
          )
      },
      {
        path: 'order-types',
        loadChildren: () =>
          import('@containers/order-types-editor/order-types-editor.module').then(
            module => module.OrderTypesEditorModule,
          )
      },
      {
        path: 'languages',
        loadChildren: () =>
          import('@containers/languages-editor/languages-editor.module').then(
            module => module.LanguagesEditorModule,
          )
      },
      {
        path: 'stores',
        loadChildren: () =>
          import('@containers/stores-editor/stores-editor.module').then(
            module => module.StoresEditorModule,
          )
      },
      {
        path: 'terminals',
        loadChildren: () =>
          import('@containers/terminals-editor/terminals-editor.module').then(
            module => module.TerminalsEditorModule,
          )
      },
      {
        path: 'backups',
        loadChildren: () =>
          import('@containers/backups/backups.module').then(
            module => module.BackupsModule,
          ),
      },
      {
        path: 'licenses-account',
        loadChildren: () =>
          import('@containers/licenses-account-editor/licenses-account-editor.module').then(
            module => module.LicensesAccountEditorModule,
          ),
      },
      {
        path: 'licenses',
        loadChildren: () =>
          import('@containers/licenses-editor/licenses-editor.module').then(
            module => module.LicensesEditorModule,
          ),
        canActivate: [AllowAdminGuard],
      },
      {
        path: 'license-types',
        loadChildren: () =>
          import('@containers/license-types-editor/license-types-editor.module').then(
            module => module.LicenseTypesEditorModule,
          ),
        canActivate: [AllowAdminGuard],
      },
      {
        path: 'applications',
        loadChildren: () =>
          import('@containers/applications-editor/applications-editor.module').then(
            module => module.ApplicationsEditorModule,
          ),
        canActivate: [AllowAdminGuard],
      },
      {
        path: 'integrations',
        loadChildren: () =>
          import('@containers/integrations-editor/integrations-editor.module').then(
            module => module.IntegrationsEditorModule,
          ),
        canActivate: [AllowAdminGuard],
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class AdminRoutingModule { }
