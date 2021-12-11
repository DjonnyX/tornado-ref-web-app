import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DMenuComponent } from './dmenu.component';
import { DMenuRoutingModule } from './dmenu-routing.module';

@NgModule({
  declarations: [
    DMenuComponent,
  ],
  imports: [
    CommonModule,
    DMenuRoutingModule,
  ]
})
export class DMenuModule { }
