import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCreatorFormComponent } from './product-creator-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { AssetPickerModule } from '@components/assets/asset-picker/asset-picker.module';
import { PricesModule } from '@components/prices/pricesmodule';

@NgModule({
  declarations: [
    ProductCreatorFormComponent,
  ],
  exports: [
    ProductCreatorFormComponent,
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
    PricesModule,
  ]
})
export class ProductCreatorFormModule { }
