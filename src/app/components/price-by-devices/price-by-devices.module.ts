import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PriceByDevicesComponent } from './price-by-devices.component';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PriceByDeviceItemComponent } from './price-by-device-item/price-by-device-item.component';

@NgModule({
  declarations: [
    PriceByDevicesComponent,
    PriceByDeviceItemComponent,
  ],
  exports: [
    PriceByDevicesComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
  ]
})
export class PriceByDevicesModule { }
