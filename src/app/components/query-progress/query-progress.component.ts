import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'ta-query-progress',
  templateUrl: './query-progress.component.html',
  styleUrls: ['./query-progress.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QueryProgressComponent implements OnInit {

  @Input() process: boolean;

  @Input() customClass: string = 'custom-query-progress';

  constructor() { }

  ngOnInit(): void {
  }

}
