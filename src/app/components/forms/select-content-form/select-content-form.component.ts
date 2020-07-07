import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter, ViewChild } from '@angular/core';
import { IProduct, ISelector, IEntity, INode } from '@models';
import { SelectContentFormModes } from './enums/select-content-form-modes.enum';
import { NodeTypes } from '@app/enums/node-types.enum';
import { MatTabGroup } from '@angular/material/tabs';
import { Subject } from 'rxjs';

const TABS_COLLECTION = [
  NodeTypes.SELECTOR,
  NodeTypes.PRODUCT,
  NodeTypes.SELECTOR_NODE,
];

@Component({
  selector: 'ta-select-content-form',
  templateUrl: './select-content-form.component.html',
  styleUrls: ['./select-content-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectContentFormComponent implements OnInit {

  @ViewChild('tabGroup', { static: true }) private _tabGroup: MatTabGroup;

  private _contentSelectorsBinder$ = new Subject<void>();
  contentSelectorsBinder$ = this._contentSelectorsBinder$.asObservable();

  private _contentProductsBinder$ = new Subject<void>();
  contentProductsBinder$ = this._contentSelectorsBinder$.asObservable();

  private _contentNodesBinder$ = new Subject<void>();
  contentNodesBinder$ = this._contentSelectorsBinder$.asObservable();

  @Input() mode: SelectContentFormModes;

  @Input() nodes: Array<INode>;

  @Input() products: Array<IProduct>;

  @Input() selectors: Array<ISelector>;

  @Input() selectorsDictionary: { [id: string]: ISelector };

  @Input() set defaultCollection(v: NodeTypes) {
    if (this._tabGroup) {
      this._previouseIndex = this._tabGroup.selectedIndex = TABS_COLLECTION.indexOf(v);
    }
  }

  @Output() change = new EventEmitter<IEntity>();

  private _previouseIndex: number = -1;

  constructor() { }

  ngOnInit(): void { }

  onChangeTab(index: number) {

    switch (this._previouseIndex) {
      case 0:
        this._contentSelectorsBinder$.next();
        break;
      case 1:
        this._contentProductsBinder$.next();
        break;
      case 2:
        this._contentNodesBinder$.next();
        break;
    }

    this._previouseIndex = index;
  }

  onChange(content: IEntity): void {
    this.change.emit(content);
  }

}
