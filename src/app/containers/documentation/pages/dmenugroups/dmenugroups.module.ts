import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DMenuGroupsComponent } from './dmenugroups.component';
import { DMenuGroupsRoutingModule } from './dmenugroups-routing.module';

@NgModule({
  declarations: [
    DMenuGroupsComponent,
  ],
  imports: [
    CommonModule,
    DMenuGroupsRoutingModule,
  ]
})
export class DMenuGroupsModule { }
