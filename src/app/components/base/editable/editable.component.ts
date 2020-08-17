import { Component, OnInit, ContentChild, Output, EventEmitter, ElementRef, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Subject, fromEvent, merge } from 'rxjs';
import { BaseComponent } from '../base-component';
import { takeUntil, filter, take, switchMapTo, race, switchMap } from 'rxjs/operators';
import { ViewModeDirective } from './view-mode.directive';
import { EditModeDirective } from './edit-mode.directive';

enum EditableModes {
  VIEW = "view",
  EDIT = "edit",
}

@Component({
  selector: 'ta-editable',
  templateUrl: './editable.component.html',
  styleUrls: ['./editable.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditableComponent extends BaseComponent implements OnInit {
  @ContentChild(ViewModeDirective) _viewModeTemplate: ViewModeDirective;
  @ContentChild(EditModeDirective) _editModeTemplate: EditModeDirective;
  @Output() update = new EventEmitter();

  private _editMode = new Subject<void>();
  editMode$ = this._editMode.asObservable();

  private _mode: EditableModes = EditableModes.VIEW;
  set mode(v: EditableModes) {
    this._mode = v;
    this._cdr.markForCheck();
  }
  get mode() {
    return this._mode;
  }

  constructor(private _elRef: ElementRef, private _cdr: ChangeDetectorRef) {
    super();
  }

  ngOnInit() {
    this.viewModeHandler();
    this.editModeHandler();
  }

  toViewMode() {
    this.mode = EditableModes.VIEW;
    this.update.emit();
  }

  toEditMode() {
    this.mode = EditableModes.EDIT;
  }

  complete() {
    this.toViewMode();
  }

  private get element() {
    return this._elRef.nativeElement;
  }

  private viewModeHandler() {
    fromEvent(this.element, 'click').pipe(
      takeUntil(this.unsubscribe$),
    ).subscribe(() => {
      this.mode = EditableModes.EDIT;
      this._editMode.next();
    });
  }

  private editModeHandler() {
    const clickOutside$ = fromEvent(document, 'click').pipe(
      filter(({ target }) => this.element.contains(target) === false),
      take(1),
    );
    const clickEnter$ = fromEvent(this.element, 'keyup').pipe(
      filter((event: KeyboardEvent) => event.keyCode === 13),
      take(1),
    );

    this.editMode$.pipe(
      switchMap(() => merge(clickOutside$, clickEnter$)),
      takeUntil(this.unsubscribe$),
    ).subscribe(event => this.toViewMode());
  }

  get currentView() {
    return this.mode === 'view' ? this._viewModeTemplate.template : this._editModeTemplate.template;
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }
}