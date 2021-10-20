import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmptyPageComponent } from '@components/empty-page/empty-page.component';
import { DocumentationContainer } from './documentation.container';

const routes: Routes = [
    {
        path: '',
        component: DocumentationContainer,
        children: [
            //   {
            //     path: 'create',
            //     loadChildren: () =>
            //       import('@containers/currency-creator/currency-creator.module').then(
            //         module => module.CurrencyCreatorModule,
            //       )
            //   },
            {
                path: '**',
                redirectTo: 'page-not-found',
            },
            {
                path: 'page-not-found',
                component: EmptyPageComponent,
            }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [],
})
export class DocumentationRoutingModule { }
