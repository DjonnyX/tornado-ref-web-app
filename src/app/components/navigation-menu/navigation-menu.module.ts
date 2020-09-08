import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { NavigationMenuComponent } from "./navigation-menu.component";

@NgModule({
  declarations: [
    NavigationMenuComponent,
  ],
  exports: [
    NavigationMenuComponent,
  ],
  imports: [
    CommonModule,
    MatListModule,
  ]
})
export class NavigationMenuModule { }
