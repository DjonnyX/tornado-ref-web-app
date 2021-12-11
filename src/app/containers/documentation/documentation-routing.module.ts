import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmptyPageComponent } from '@components/empty-page/empty-page.component';
import { DocumentationContainer } from './documentation.container';

const routes: Routes = [
    {
        path: '',
        component: DocumentationContainer,
        children: [
            {
                path: 'registration',
                loadChildren: () =>
                    import('@containers/documentation/pages/dregistration/dregistration.module').then(
                        module => module.DRegistrationModule,
                    )
            },
            {
                path: 'licenses',
                loadChildren: () =>
                    import('@containers/documentation/pages/dlicenses/dlicenses.module').then(
                        module => module.DLicensesModule,
                    )
            },
            {
                path: 'administrators',
                loadChildren: () =>
                    import('@containers/documentation/pages/dusers/dusers.module').then(
                        module => module.DUsersModule,
                    )
            },
            {
                path: 'evo-integration',
                loadChildren: () =>
                    import('@containers/documentation/pages/devointegration/devointegration.module').then(
                        module => module.DEvoIntegrationModule,
                    )
            },
            {
                path: 'products',
                loadChildren: () =>
                    import('@containers/documentation/pages/dproducts/dproducts.module').then(
                        module => module.DProductsModule,
                    )
            },
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
