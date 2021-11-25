import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubscriptionsEditorRoutingModule } from './subscriptions-editor-routing.module';
import { SubscriptionsEditorContainer } from './subscriptions-editor.container';
import { SubscriptionsEditorComponentModule } from '@components/subscriptions-editor/subscriptions-editor.module';
import { QueryProgressessModule } from '@components/query-progress/query-progress.module';
import { MainFooterModule } from '@components/main-footer/main-footer.module';

@NgModule({
  declarations: [
    SubscriptionsEditorContainer,
  ],
  imports: [
    CommonModule,
    SubscriptionsEditorRoutingModule,
    SubscriptionsEditorComponentModule,
    QueryProgressessModule,
    MainFooterModule,
  ],
})
export class SubscriptionsEditorModule { }
