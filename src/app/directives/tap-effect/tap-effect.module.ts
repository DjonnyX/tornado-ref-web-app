import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TapEffectDirective } from './tap-effect.directive';

@NgModule({
  declarations: [
    TapEffectDirective,
  ],
  exports: [
    TapEffectDirective,
  ],
  imports: [
    CommonModule,
  ]
})
export class TapEffectModule { }
