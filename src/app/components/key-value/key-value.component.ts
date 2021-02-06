import { Component, Input, OnInit } from '@angular/core';

export interface IKeyValue {
  key: string;
  value: string;
  link?: Array<any>;
}

@Component({
  selector: 'ta-key-value',
  templateUrl: './key-value.component.html',
  styleUrls: ['./key-value.component.scss']
})
export class KeyValueComponent implements OnInit {

  @Input() data: IKeyValue;

  constructor() { }

  ngOnInit(): void {
  }

}
