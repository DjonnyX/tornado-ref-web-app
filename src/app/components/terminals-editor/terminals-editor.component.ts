import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteEntityDialogComponent } from '@components/dialogs/delete-entity-dialog/delete-entity-dialog.component';
import { take, takeUntil } from 'rxjs/operators';
import { BaseComponent } from '@components/base/base-component';
import { ITerminal, IRef, TerminalStatusTypes, IStore } from '@djonnyx/tornado-types';
import { LocalizationService } from '@app/services/localization/localization.service';

@Component({
  selector: 'ta-terminals-editor-component',
  templateUrl: './terminals-editor.component.html',
  styleUrls: ['./terminals-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TerminalsEditorComponent extends BaseComponent implements OnInit, OnDestroy {

  @Input() collection: Array<ITerminal>;

  private _storesMap: { [id: string]: IStore };

  get storesMap() {
    return this._storesMap;
  }

  private _stores: Array<IStore>;
  @Input() set stores(v: Array<IStore>) {
    if (this._stores !== v) {
      this._stores = v;

      this._storesMap = {};

      if (this._stores) {
        this._stores.forEach(int => {
          this._storesMap[int.id] = int;
        });
      }
    }
  }

  @Input() refInfo: IRef;

  @Input() searchFieldClass = "accent";

  @Output() create = new EventEmitter<void>();

  @Output() edit = new EventEmitter<ITerminal>();

  @Output() update = new EventEmitter<ITerminal>();

  @Output() delete = new EventEmitter<string>();

  searchPattern = "";

  constructor(
    public dialog: MatDialog,
    public readonly localization: LocalizationService,
  ) {
    super();
  }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  onToggleActive(event: Event, terminal: ITerminal): void {
    event.stopImmediatePropagation();
    event.preventDefault();

    this.update.emit(terminal);
  }

  onCreate(): void {
    this.create.emit();
  }

  onEdit(terminal: ITerminal): void {
    this.edit.emit(terminal);
  }

  onDelete(terminal: ITerminal): void {
    const dialogRef = this.dialog.open(DeleteEntityDialogComponent,
      {
        data: {
          title: "Удалить валюту?",
          message: `"${terminal.name}" будет безвозвратно удален.`,
        },
      });

    dialogRef.afterClosed().pipe(
      take(1),
      takeUntil(this.unsubscribe$),
    ).subscribe(result => {
      if (result) {
        this.delete.emit(terminal.id);
      }
    });
  }

  onSearch(pattern: string): void {
    this.searchPattern = pattern;
  }

  isTerminalActive(terminal: ITerminal) {
    return terminal.status === TerminalStatusTypes.ONLINE;
  }
}
