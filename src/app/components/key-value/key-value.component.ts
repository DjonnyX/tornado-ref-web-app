import { Component, Input, OnInit } from '@angular/core';

export interface IKeyValue {
  key: string;
  value: string;
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
