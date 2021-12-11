import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DEvoIntegrationComponent } from './devointegration.component';
import { DEvoIntegrationRoutingModule } from './devointegration-routing.module';

@NgModule({
  declarations: [
    DEvoIntegrationComponent,
  ],
  imports: [
    CommonModule,
    DEvoIntegrationRoutingModule,
  ]
})
export class DEvoIntegrationModule { }
