import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Observable } from 'rxjs';
import { MediaObserver } from '@angular/flex-layout';
import { Router } from '@angular/router';

@Component({
  selector: 'tss-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  
  @ViewChild('sidenav') private _sidenav: MatSidenav;

  isMobile$: Observable<boolean>;

  constructor(private _media: MediaObserver, private _router: Router) { }

  ngOnInit(): void {
  }

}
