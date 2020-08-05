import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectorCreatorContainer } from './selector-creator.container';
import { SelectorCreatorFormModule } from '@components/forms/selector-creator-form/selector-creator-form.module';
import { SelectorCreatorRoutingModule } from './selector-creator-routing.module';
import { QueryProgressessModule } from '@components/query-progress/query-progress.module';
import { AssetsUploaderModule } from '@components/assets/assets-uploader/assets-uploader.module';
import { AssetPickerModule } from '@components/assets/asset-picker/asset-picker.module';

@NgModule({
  declarations: [
    SelectorCreatorContainer,
  ],
  imports: [
    CommonModule,
    SelectorCreatorRoutingModule,
    SelectorCreatorFormModule,
    QueryProgressessModule,
    AssetsUploaderModule,
    AssetPickerModule,
  ]
})
export class SelectorCreatorModule { }
