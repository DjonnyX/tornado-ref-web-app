import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalizationService } from '@app/services/localization/localization.service';

@Component({
  selector: 'ta-term-of-use',
  templateUrl: './term-of-use.container.html',
  styleUrls: ['./term-of-use.container.scss']
})
export class TermOfUseContainer implements OnInit {

  constructor(private _router: Router, public readonly localization: LocalizationService) { }

  ngOnInit(): void {
  }

  goBack() {
    this._router.navigate(['signup']);
  }
}
