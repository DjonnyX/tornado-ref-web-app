import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CookieTermOfUseComponent } from './cookie-term-of-use.component';

const routes: Routes = [
    {
        path: '',
        component: CookieTermOfUseComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    providers: [],
})
export class CookieTermOfUseRoutingModule { }
