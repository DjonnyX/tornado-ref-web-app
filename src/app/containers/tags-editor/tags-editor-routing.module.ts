import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TagsEditorContainer } from './tags-editor.container';

const routes: Routes = [
  {
    path: '',
    component: TagsEditorContainer,
  },
  {
    path: 'create',
    loadChildren: () =>
      import('@containers/tag-creator/tag-creator.module').then(
        module => module.TagCreatorModule,
      )
  },
  {
    path: 'edit',
    loadChildren: () =>
      import('@containers/tag-creator/tag-creator.module').then(
        module => module.TagCreatorModule,
      )
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class TagsEditorRoutingModule { }
