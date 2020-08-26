import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderTypeCreatorFormComponent } from './order-type-creator-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { OrderTypeContentModule } from './ordertype-content/ordertype-content.module';

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
    OrderTypeContentModule,
  ]
})
export class OrderTypeCreatorFormModule { }
