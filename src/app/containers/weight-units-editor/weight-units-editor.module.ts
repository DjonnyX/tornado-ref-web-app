import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeightUnitsEditorRoutingModule } from './weight-units-editor-routing.module';
import { WeightUnitsEditorContainer } from './weight-units-editor.container';
import { WeightUnitsEditorComponentModule } from '@components/weight-units-editor/weight-units-editor.module';
import { QueryProgressessModule } from '@components/query-progress/query-progress.module';
import { MainFooterModule } from '@components/main-footer/main-footer.module';

@NgModule({
  declarations: [
    WeightUnitsEditorContainer,
  ],
  imports: [
    CommonModule,
    WeightUnitsEditorRoutingModule,
    WeightUnitsEditorComponentModule,
    QueryProgressessModule,
    MainFooterModule,
  ],
})
export class WeightUnitsEditorModule { }
