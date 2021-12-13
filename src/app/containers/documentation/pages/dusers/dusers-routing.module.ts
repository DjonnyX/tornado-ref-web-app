import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DUsersComponent } from './dusers.component';

const routes: Routes = [
    {
        path: '',
        component: DUsersComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [],
})
export class DUsersRoutingModule { }
