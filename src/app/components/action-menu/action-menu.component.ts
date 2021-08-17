import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { LocalizationService } from '@app/services/localization/localization.service';
import { BaseComponent } from '@components/base/base-component';
import { SelectComponent } from '@components/base/select/select.component';
import { filter, takeUntil } from 'rxjs/operators';

export interface IActionMenuItem {
  translateKey: string;
  icon: string;
  trigger: () => void;
  [x: string]: any;
}

@Component({
  selector: 'ta-action-menu',
  templateUrl: './action-menu.component.html',
  styleUrls: ['./action-menu.component.scss']
})
export class ActionMenuComponent extends BaseComponent implements OnInit {
  @ViewChild("select", { static: true, read: SelectComponent }) select: SelectComponent;

  @Input() items: Array<IActionMenuItem>;

  ctrlActionMenu = new FormControl(null);

  constructor(
    public readonly localization: LocalizationService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.ctrlActionMenu.valueChanges.pipe(
      takeUntil(this.unsubscribe$),
      filter(v => !v),
    ).subscribe(v => {
      v?.trigger();
      this.ctrlActionMenu.reset();
    });
  }

  open(): void {
    this.select.onExpand();
  }
}
