import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { IProduct, ISelector, IEntity } from '@models';
import { SelectContentFormModes } from './enums/select-content-form-modes.enum';

@Component({
  selector: 'ta-select-content-form',
  templateUrl: './select-content-form.component.html',
  styleUrls: ['./select-content-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectContentFormComponent implements OnInit {

  @Input() mode: SelectContentFormModes;

  @Input() products: Array<IProduct>;

  @Input() selectors: Array<ISelector>;

  @Output() change = new EventEmitter<IEntity>();

  constructor() { }

  ngOnInit(): void {
  }

  onChange(content: IEntity): void {
    this.change.emit(content);
  }

}
