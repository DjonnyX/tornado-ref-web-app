import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DRegistrationComponent } from './dregistration.component';

const routes: Routes = [
    {
        path: '',
        component: DRegistrationComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [],
})
export class DRegistrationRoutingModule { }
