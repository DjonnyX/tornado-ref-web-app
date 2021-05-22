import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCreatorFormComponent } from './product-creator-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { PricesModule } from '@components/prices/pricesmodule';
import { ProductContentModule } from './product-content/product-content.module';
import { MatTabsModule } from '@angular/material/tabs';
import { KeyValueModule } from '@components/key-value/key-value.module';
import { MatDialogModule } from '@angular/material/dialog';
import { DeleteEntityDialogModule } from '@components/dialogs/delete-entity-dialog/delete-entity-dialog.module';

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
    MatTabsModule,
    MatDialogModule,
    PricesModule,
    ProductContentModule,
    DeleteEntityDialogModule,
    KeyValueModule,
  ]
})
export class ProductCreatorFormModule { }
