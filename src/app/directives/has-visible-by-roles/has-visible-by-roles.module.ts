import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HasVisibleByRolesDirective } from './has-visible-by-roles.directive';

@NgModule({
  declarations: [
    HasVisibleByRolesDirective,
  ],
  exports: [
    HasVisibleByRolesDirective,
  ],
  imports: [
    CommonModule
  ]
})
export class HasVisibleByRolesModule { }
