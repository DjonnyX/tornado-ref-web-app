import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter, OnDestroy } from '@angular/core';
import { NodeTypes } from '@app/enums/node-types.enum';
import { INode, ISelector, IProduct } from '@models';
import { DeleteEntityDialogComponent } from '@components/dialogs/delete-entity-dialog/delete-entity-dialog.component';
import { take, takeUntil } from 'rxjs/operators';
import { BaseComponent } from '@components/base/base-component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'ta-node-tree-item',
  templateUrl: './node-tree-item.component.html',
  styleUrls: ['./node-tree-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NodeTreeItemComponent extends BaseComponent implements OnInit, OnDestroy {
  @Input() type: NodeTypes | string;

  node: INode;

  private _id: string;
  @Input() set nodeId(id: string) {
    if (this._id !== id) {
      this._id = id;
      this.resetNode();
    }
  }

  @Input() content: ISelector | IProduct;

  private _nodesDictionary: { [id: string]: INode };
  @Input() set nodesDictionary(v: { [id: string]: INode }) {
    if (this._nodesDictionary !== v) {
      this._nodesDictionary = v;
      this.resetNode();
    }
  }

  get nodesDictionary() { return this._nodesDictionary; }

  @Output() create = new EventEmitter<INode>();

  @Output() update = new EventEmitter<INode>();

  @Output() delete = new EventEmitter<INode>();

  isExpanded = false;

  constructor(public dialog: MatDialog) {
    super();
  }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  toggleExpand(): void {
    this.isExpanded = !this.isExpanded;
  }

  resetNode(): void {
    this.node = !!this._nodesDictionary && !!this._id ? this.nodesDictionary[this._id] : null;
  }

  createNodeForChild(node: INode): void {
    this.create.emit(node);
  }
  
  deleteNodeForChild(node: INode): void {
    this.delete.emit(node);
  }

  onShowMenu(event: Event): void {
    event.stopImmediatePropagation();
    event.preventDefault();
  }

  onCreate(): void {
    this.create.emit({
      type: NodeTypes.SELECTOR,
      parentId: this.node.id,
      contentId: this.node.id,
      children: [],
    });
  }

  onEdit(): void {

  }

  onDelete(): void {
    const dialogRef = this.dialog.open(DeleteEntityDialogComponent,
      {
        data: {
          title: "Delete the product?",
          message: `"${this.node.id}" will be permanently deleted. ${!!this.node.children && this.node.children.length > 0 ? "His children will be permanently deleted." : ""}`,
        },
      });

    dialogRef.afterClosed().pipe(
      take(1),
      takeUntil(this.unsubscribe$),
    ).subscribe(result => {
      if (result) {
        this.delete.emit(this.node);
      }
    });
  }
}
