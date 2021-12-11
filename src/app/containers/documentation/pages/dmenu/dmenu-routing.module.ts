import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DMenuComponent } from './dmenu.component';

const routes: Routes = [
    {
        path: '',
        component: DMenuComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [],
})
export class DMenuRoutingModule { }
