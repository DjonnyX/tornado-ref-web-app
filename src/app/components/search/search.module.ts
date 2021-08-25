import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TapEffectModule } from '@app/directives/tap-effect/tap-effect.module';

@NgModule({
  declarations: [
    SearchComponent,
  ],
  exports: [
    SearchComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TapEffectModule,
  ]
})
export class SearchModule { }
