import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleCreatorContainer } from './role-creator.container';
import { RoleCreatorFormModule } from '@components/forms/role-creator-form/role-creator-form.module';
import { RoleCreatorRoutingModule } from './role-creator-routing.module';
import { QueryProgressessModule } from '@components/query-progress/query-progress.module';

@NgModule({
  declarations: [
    RoleCreatorContainer,
  ],
  imports: [
    CommonModule,
    RoleCreatorRoutingModule,
    RoleCreatorFormModule,
    QueryProgressessModule,
  ]
})
export class RoleCreatorModule { }
