import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DEvoIntegrationComponent } from './devointegration.component';

const routes: Routes = [
    {
        path: '',
        component: DEvoIntegrationComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [],
})
export class DEvoIntegrationRoutingModule { }
