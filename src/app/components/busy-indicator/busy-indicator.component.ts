import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-busy-indicator',
  templateUrl: './busy-indicator.component.html',
  styleUrls: ['./busy-indicator.component.scss'],
  host: {
    styles: "width: 100%; position: absolute; height: 100%;"
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BusyIndicatorComponent implements OnInit {
  @Input() public overlay: boolean = true;
  @Input() public fixed: boolean = false;

  constructor() {
  }

  ngOnInit(): void {
  }

}
