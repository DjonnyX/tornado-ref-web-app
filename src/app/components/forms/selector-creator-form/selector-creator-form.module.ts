import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectorCreatorFormComponent } from './selector-creator-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { AssetPickerModule } from '@components/assets/asset-picker/asset-picker.module';

@NgModule({
  declarations: [
    SelectorCreatorFormComponent,
  ],
  exports: [
    SelectorCreatorFormComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    AssetPickerModule,
  ]
})
export class SelectorCreatorFormModule { }
