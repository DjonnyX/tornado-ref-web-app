import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdCreatorFormComponent } from './ad-creator-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { AdContentModule } from './ad-content/ad-content.module';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  declarations: [
    AdCreatorFormComponent,
  ],
  exports: [
    AdCreatorFormComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatTabsModule,
    AdContentModule,
  ]
})
export class AdCreatorFormModule { }
