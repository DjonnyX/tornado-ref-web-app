import { Component, OnInit } from '@angular/core';
import { interval, Observable, of, timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'ta-count',
  templateUrl: './count.component.html',
  styleUrls: ['./count.component.scss']
})
export class CountComponent implements OnInit {

  count$: Observable<string>;

  constructor() { }

  ngOnInit(): void {
    this.count$ = timer(1, 1000).pipe(
      map(time => `${time}s`),
    );
  }
}
