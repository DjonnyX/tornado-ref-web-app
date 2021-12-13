import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DModifiersComponent } from './dmodifiers.component';

const routes: Routes = [
    {
        path: '',
        component: DModifiersComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [],
})
export class DModifiersRoutingModule { }
