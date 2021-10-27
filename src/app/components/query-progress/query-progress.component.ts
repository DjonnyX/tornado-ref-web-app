import { Component, OnInit, ChangeDetectionStrategy, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'ta-query-progress',
  templateUrl: './query-progress.component.html',
  styleUrls: ['./query-progress.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QueryProgressComponent implements OnInit {

  @Input() process: boolean;

  @Input() customClass: string = 'custom-query-progress';

  get classes() {
    return {
      'query-progress': true,
      [this.customClass]: true,
    };
  }

  constructor() { }

  ngOnInit(): void {
  }

}
