import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DProductsComponent } from './dproducts.component';

const routes: Routes = [
    {
        path: '',
        component: DProductsComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [],
})
export class DProductsRoutingModule { }
