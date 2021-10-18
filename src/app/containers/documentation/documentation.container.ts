import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState } from '@store/state';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ta-documentation',
  templateUrl: './documentation.container.html',
  styleUrls: ['./documentation.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentationContainer implements OnInit, OnDestroy {

  constructor(private _store: Store<IAppState>, private _router: Router, private _activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    
  }

  ngOnDestroy(): void {
    
  }
}
