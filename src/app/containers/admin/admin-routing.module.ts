import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminContainer } from './admin.container';
import { SelectorTypes, AdTypes } from '@djonnyx/tornado-types';

const routes: Routes = [
  {
    path: '',
    component: AdminContainer,
    children: [
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
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class AdminRoutingModule { }
