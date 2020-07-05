import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { INode, ISelector, IProduct } from '@models';

@Component({
  selector: 'ta-product-hierarchy-editor',
  templateUrl: './product-hierarchy-editor.component.html',
  styleUrls: ['./product-hierarchy-editor.component.scss']
})
export class ProductHierarchyEditorComponent implements OnInit {

  @Input() rootNodeId: string;

  @Input() nodes: Array<INode>;
  
  @Input() selectors: Array<ISelector>;
  
  @Input() products: Array<IProduct>;

  @Output() create = new EventEmitter<INode>();

  @Output() update = new EventEmitter<INode>();

  @Output() delete = new EventEmitter<INode>();

  constructor() { }

  ngOnInit(): void {

  }

  onCreate(node: INode): void {
    this.create.emit(node);
  }

  onUpdate(node: INode): void {
    this.update.emit(node);
  }

  onDelete(node: INode): void {
    this.delete.emit(node);
  }
}
