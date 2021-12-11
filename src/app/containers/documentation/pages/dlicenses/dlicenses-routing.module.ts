import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DLicensesComponent } from './dlicenses.component';

const routes: Routes = [
    {
        path: '',
        component: DLicensesComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [],
})
export class DLicensesRoutingModule { }
