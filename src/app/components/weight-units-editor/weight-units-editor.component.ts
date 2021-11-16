import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteEntityDialogComponent } from '@components/dialogs/delete-entity-dialog/delete-entity-dialog.component';
import { take, takeUntil } from 'rxjs/operators';
import { BaseComponent } from '@components/base/base-component';
import { IWeightUnit, IRef, IWeightUnitContentsItem, ILanguage } from '@djonnyx/tornado-types';
import { LayoutTypes } from '@components/state-panel/state-panel.component';
import { LocalizationService } from '@app/services/localization/localization.service';

@Component({
  selector: 'ta-weight-units-editor-component',
  templateUrl: './weight-units-editor.component.html',
  styleUrls: ['./weight-units-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeightUnitsEditorComponent extends BaseComponent implements OnInit, OnDestroy {

  public readonly LayoutTypes = LayoutTypes;

  @Output() changeLayout = new EventEmitter<LayoutTypes>();

  @Output() changeDisplayInactiveEntities = new EventEmitter<boolean>();

  private _collection: Array<IWeightUnit>;
  @Input() set collection(value: Array<IWeightUnit>) {
    if (this._collection != value) {
      this._collection = value || [];

      this.resetFilteredCollection();
    }
  }
  get collection() { return this._collection; }

  public filteredCollection: Array<IWeightUnit>;

  @Input() refInfo: IRef;

  @Input() searchFieldClass = "accent";

  @Input() defaultLanguage: ILanguage;

  @Input() languages: Array<ILanguage>;

  @Input() layoutType: LayoutTypes;

  private _displayInactiveEntities: boolean = true;
  @Input() set displayInactiveEntities(v: boolean) {
    if (this._displayInactiveEntities !== v) {
      this._displayInactiveEntities = v;
      this.resetFilteredCollection();
    }
  }
  get displayInactiveEntities() { return this._displayInactiveEntities; }

  @Output() create = new EventEmitter<void>();

  @Output() edit = new EventEmitter<IWeightUnit>();

  @Output() update = new EventEmitter<IWeightUnit>();

  @Output() delete = new EventEmitter<string>();

  searchPattern = "";

  constructor(
    public dialog: MatDialog,
    private _cdr: ChangeDetectorRef,
    public readonly localization: LocalizationService,
  ) {
    super();
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  getContent(weightUnit: IWeightUnit): IWeightUnitContentsItem {
    return weightUnit.contents[this.defaultLanguage.code];
  }

  getName(weightUnit: IWeightUnit): string | undefined {
    const weightUnitContent = this.getContent(weightUnit);
    return !!weightUnitContent ? weightUnitContent.name : undefined;
  }

  onCreate(): void {
    this.create.emit();
  }

  onEdit(weightUnit: IWeightUnit): void {
    this.edit.emit(weightUnit);
  }

  onDelete(weightUnit: IWeightUnit): void {
    const dialogRef = this.dialog.open(DeleteEntityDialogComponent,
      {
        data: {
          title: "common_dialog-delete-the-weightUnit",
          message: `#{"${this.getName(weightUnit)}" }common_action-will-be-permanently-deleted.`,
        },
      });

    dialogRef.afterClosed().pipe(
      take(1),
      takeUntil(this.unsubscribe$),
    ).subscribe(result => {
      if (result) {
        this.delete.emit(weightUnit.id);
      }
    });
  }

  onSearch(pattern: string): void {
    this.searchPattern = pattern;
  }

  resetFilteredCollection() {
    this.filteredCollection = (this._collection || []).filter(item => !!this._displayInactiveEntities);
    this._cdr.markForCheck();
  }

  onSwitchLayout(layoutType: LayoutTypes) {
    this.changeLayout.emit(layoutType);
  }

  onShowHiddenEntities(displayInactiveEntities: boolean) {
    this.changeDisplayInactiveEntities.emit(displayInactiveEntities);
  }
}
