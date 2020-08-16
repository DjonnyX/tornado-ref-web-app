import { Component, OnInit, ContentChild, Output, EventEmitter, ElementRef } from '@angular/core';
import { Subject, fromEvent } from 'rxjs';
import { BaseComponent } from '../base-component';
import { takeUntil, filter, take, switchMapTo } from 'rxjs/operators';
import { ViewModeDirective } from './view-mode.directive';
import { EditModeDirective } from './edit-mode.directive';

@Component({
  selector: 'ta-editable',
  templateUrl: './editable.component.html',
  styleUrls: ['./editable.component.scss']
})
export class EditableComponent extends BaseComponent implements OnInit {
  @ContentChild(ViewModeDirective) viewModeTpl: ViewModeDirective;
  @ContentChild(EditModeDirective) editModeTpl: EditModeDirective;
  @Output() update = new EventEmitter();

  private _editMode = new Subject<boolean>();
  editMode$ = this._editMode.asObservable();

  mode: 'view' | 'edit' = 'view';

  constructor(private _elRef: ElementRef) {
    super();
  }

  ngOnInit() {
    this.viewModeHandler();
    this.editModeHandler();
  }

  toViewMode() {
    this.update.next();
    this.mode = 'view';
  }

  private get element() {
    return this._elRef.nativeElement;
  }

  private viewModeHandler() {
    fromEvent(this.element, 'dblclick').pipe(
      takeUntil(this.unsubscribe$),
    ).subscribe(() => {
      this.mode = 'edit';
      this._editMode.next(true);
    });
  }

  private editModeHandler() {
    const clickOutside$ = fromEvent(document, 'click').pipe(
      filter(({ target }) => this.element.contains(target) === false),
      take(1),
    )

    this.editMode$.pipe(
      switchMapTo(clickOutside$),
      take(1),
      takeUntil(this.unsubscribe$),
    ).subscribe(event => this.toViewMode());
  }

  get currentView() {
    return this.mode === 'view' ? this.viewModeTpl.template : this.editModeTpl.template;
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }
}