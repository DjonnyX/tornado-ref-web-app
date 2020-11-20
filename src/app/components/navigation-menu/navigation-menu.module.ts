import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';
import { NavigationMenuComponent } from "./navigation-menu.component";
import { FlexLayoutModule } from '@angular/flex-layout';
import { HasVisibleByRolesModule } from '@directives';

@NgModule({
  declarations: [
    NavigationMenuComponent,
  ],
  exports: [
    NavigationMenuComponent,
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatIconModule,
    MatRippleModule,
    HasVisibleByRolesModule,
  ]
})
export class NavigationMenuModule { }
