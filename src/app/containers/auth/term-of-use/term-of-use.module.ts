import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TermOfUseRoutingModule } from './term-of-use-routing.module';
import { TermOfUseContainer } from './term-of-use.container';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    TermOfUseContainer,
  ],
  imports: [
    CommonModule,
    TermOfUseRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
  ]
})
export class TermOfUseModule { }
