import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RolesEditorRoutingModule } from './roles-editor-routing.module';
import { RolesEditorContainer } from './roles-editor.container';
import { RolesEditorComponentModule } from '@components/roles-editor/roles-editor.module';
import { QueryProgressessModule } from '@components/query-progress/query-progress.module';
import { MainFooterModule } from '@components/main-footer/main-footer.module';

@NgModule({
  declarations: [
    RolesEditorContainer,
  ],
  imports: [
    CommonModule,
    RolesEditorRoutingModule,
    RolesEditorComponentModule,
    QueryProgressessModule,
    MainFooterModule,
  ],
})
export class RolesEditorModule { }
