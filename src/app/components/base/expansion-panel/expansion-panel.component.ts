import { Component, Input, OnInit, TemplateRef } from '@angular/core';

@Component({
  selector: 'ta-expansion-panel',
  templateUrl: './expansion-panel.component.html',
  styleUrls: ['./expansion-panel.component.scss']
})
export class ExpansionPanelComponent implements OnInit {
  @Input() headerTemplate: TemplateRef<any>;

  @Input() headerTemplateData: any;

  @Input() headerIconBase: string;

  @Input() opened = true;

  @Input() title: string;

  constructor() { }

  ngOnInit(): void {
  }

  onToggleExpand(e:Event): void {
    this.opened = !this.opened;
  }
}
