import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderTypeCreatorFormComponent } from './order-type-creator-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { ColorPickerModule } from 'ngx-color-picker';
import { AssetPickerModule } from '@components/assets/asset-picker/asset-picker.module';

@NgModule({
  declarations: [
    OrderTypeCreatorFormComponent,
  ],
  exports: [
    OrderTypeCreatorFormComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    AssetPickerModule,
    ColorPickerModule,
  ]
})
export class OrderTypeCreatorFormModule { }