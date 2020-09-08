import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';
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
    MatIconModule,
    MatRippleModule,
  ]
})
export class NavigationMenuModule { }
