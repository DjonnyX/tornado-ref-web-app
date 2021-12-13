import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DAdsComponent } from './dads.component';

const routes: Routes = [
    {
        path: '',
        component: DAdsComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [],
})
export class DAdsRoutingModule { }
