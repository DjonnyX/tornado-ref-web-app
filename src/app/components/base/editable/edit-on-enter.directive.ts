import { Directive, HostListener } from '@angular/core';
import { EditableComponent } from '@components/base/editable/editable.component';

@Directive({
  selector: '[editOnEnter]'
})
export class EditOnEnterDirective {

  constructor(private _editable: EditableComponent) {
  }

  @HostListener('keyup.enter')
  onEnter() {
    this._editable.toViewMode();
  }

}
