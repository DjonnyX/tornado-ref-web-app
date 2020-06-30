import { Component, OnInit, Input } from '@angular/core';
import { INode } from '@models';

@Component({
  selector: 'ta-node-tree',
  templateUrl: './node-tree.component.html',
  styleUrls: ['./node-tree.component.scss']
})
export class NodeTreeComponent implements OnInit {

  @Input() collection: Array<INode>;

  constructor() { }

  ngOnInit(): void {
  }

}
