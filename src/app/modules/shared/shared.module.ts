import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { BusyIndicatorComponent } from '@components/busy-indicator/busy-indicator.component';
import { BusyDirective } from '@directives';

@NgModule({
  declarations: [
    BusyIndicatorComponent,
    BusyDirective,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
  ],
  entryComponents: [
    BusyIndicatorComponent,
  ]
})
export class SharedModule { }
