import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LicenseTypesEditorRoutingModule } from './license-types-editor-routing.module';
import { LicenseTypesEditorContainer } from './license-types-editor.container';
import { LicenseTypesEditorComponentModule } from '@components/license-types-editor/license-types-editor.module';
import { QueryProgressessModule } from '@components/query-progress/query-progress.module';
import { MainFooterModule } from '@components/main-footer/main-footer.module';

@NgModule({
  declarations: [
    LicenseTypesEditorContainer,
  ],
  imports: [
    CommonModule,
    LicenseTypesEditorRoutingModule,
    LicenseTypesEditorComponentModule,
    QueryProgressessModule,
    MainFooterModule,
  ],
})
export class LicenseTypesEditorModule { }
