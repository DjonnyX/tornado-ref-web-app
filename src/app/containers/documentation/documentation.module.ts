import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentationContainer } from './documentation.container';
import { EmptyPageModule } from '@components/empty-page/empty-page.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NavigationMenuModule } from '@components/navigation-menu/navigation-menu.module';
import { SelectModule } from '@components/base/select/select.module';
import { DocumentationRoutingModule } from './documentation-routing.module';

@NgModule({
  declarations: [
    DocumentationContainer,
  ],
  imports: [
    CommonModule,
    EmptyPageModule,
    FormsModule,
    ReactiveFormsModule,
    DocumentationRoutingModule,
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
export class DocumentationModule { }
