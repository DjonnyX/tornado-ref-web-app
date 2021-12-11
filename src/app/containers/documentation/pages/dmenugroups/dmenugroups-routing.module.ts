import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DMenuGroupsComponent } from './dmenugroups.component';

const routes: Routes = [
    {
        path: '',
        component: DMenuGroupsComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [],
})
export class DMenuGroupsRoutingModule { }
