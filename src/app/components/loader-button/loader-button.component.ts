import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ta-loader-button',
  templateUrl: './loader-button.component.html',
  styleUrls: ['./loader-button.component.scss']
})
export class LoaderButtonComponent implements OnInit {

  @Input() textContent: string;

  @Input() iconContent: string;

  @Input() percents: number = 0;

  @Input() disabled: boolean = false;

  constructor() { }

  ngOnInit(): void {

  }
}
