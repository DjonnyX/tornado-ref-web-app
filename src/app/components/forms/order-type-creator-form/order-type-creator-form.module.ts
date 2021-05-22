import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderTypeCreatorFormComponent } from './order-type-creator-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { OrderTypeContentModule } from './order-type-content/order-type-content.module';
import { DeleteEntityDialogModule } from '@components/dialogs/delete-entity-dialog/delete-entity-dialog.module';
import { MatDialogModule } from '@angular/material/dialog';

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
    MatTabsModule,
    MatDialogModule,
    DeleteEntityDialogModule,
    OrderTypeContentModule,
  ]
})
export class OrderTypeCreatorFormModule { }
