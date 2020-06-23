import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ta-term-of-use',
  templateUrl: './term-of-use.container.html',
  styleUrls: ['./term-of-use.container.scss']
})
export class TermOfUseContainer implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit(): void {
  }

  goBack() {
    this._router.navigate(['signup']);
  }
}
