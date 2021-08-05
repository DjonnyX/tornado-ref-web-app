import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalizationConfig } from './localization.config';

@NgModule({
  declarations: [
  ],
  exports: [
  ],
  imports: [
    CommonModule,
  ]
})
export class LocalizationModule {
  static forRoot(config: LocalizationConfig): ModuleWithProviders<any> {
    return {
      ngModule: LocalizationModule,
      providers: [
        {provide: LocalizationConfig, useValue: config }
      ]
    };
  }
}
