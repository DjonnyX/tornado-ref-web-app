import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AdminContainer } from './admin.container';
import { MatSelectModule } from '@angular/material/select';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NavigationMenuModule } from '@components/navigation-menu/navigation-menu.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectModule } from '@components/base/select/select.module';

@NgModule({
  declarations: [
    AdminContainer,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    FlexLayoutModule,
    NavigationMenuModule,
    SelectModule,
  ]
})
export class AdminModule { }
