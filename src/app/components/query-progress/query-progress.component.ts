import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'ta-query-progress',
  templateUrl: './query-progress.component.html',
  styleUrls: ['./query-progress.component.scss'],
  host: {
    style: "width: 100%; position: absolute; height: 100%;"
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QueryProgressComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
