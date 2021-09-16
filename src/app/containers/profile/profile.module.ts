import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileContainer } from './profile.container';
import { ProfileFormModule } from '@components/forms/profile-form/profile-form.module';
import { ProfileRoutingModule } from './profile-routing.module';
import { QueryProgressessModule } from '@components/query-progress/query-progress.module';

@NgModule({
  declarations: [
    ProfileContainer,
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    ProfileFormModule,
    QueryProgressessModule,
  ]
})
export class ProfileModule { }
