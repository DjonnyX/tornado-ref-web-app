import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter, OnDestroy } from '@angular/core';
import { NodeTypes } from '@app/enums/node-types.enum';
import { INode, ISelector, IProduct } from '@models';
import { DeleteEntityDialogComponent } from '@components/dialogs/delete-entity-dialog/delete-entity-dialog.component';
import { take, takeUntil } from 'rxjs/operators';
import { BaseComponent } from '@components/base/base-component';
import { MatDialog } from '@angular/material/dialog';
import { SetupNodeContentDialogComponent } from '@components/dialogs/setup-node-content-dialog/setup-node-content-dialog.component';

@Component({
  selector: 'ta-node-tree-item',
  templateUrl: './node-tree-item.component.html',
  styleUrls: ['./node-tree-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NodeTreeItemComponent extends BaseComponent implements OnInit, OnDestroy {
  @Input() type: NodeTypes | string;

  @Input() products: Array<IProduct>;

  @Input() selectors: Array<ISelector>;

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

  isRoot: boolean;

  private _depth: number;
  @Input() set depth(v: number) {
    if (this._depth !== v) {
      this._depth = v;

      this.isExpanded = this._depth <= 1;

      this.isRoot = this._depth === 0;
    }
  }

  get nodesDictionary() { return this._nodesDictionary; }

  @Input() productsDictionary: {[id: string]: IProduct};
  
  @Input() selectorsDictionary: {[id: string]: ISelector};

  @Output() create = new EventEmitter<INode>();

  @Output() update = new EventEmitter<INode>();

  @Output() delete = new EventEmitter<INode>();

  isExpanded = true;

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

  updateNodeForChild(node: INode): void {
    this.update.emit(node);
  }

  deleteNodeForChild(node: INode): void {
    this.delete.emit(node);
  }

  getContentName(): string {
    if (!!this.selectorsDictionary && this.node.type === NodeTypes.SELECTOR) {
      const content = this.selectorsDictionary[this.node.contentId];
      return !!content ? content.name : "";
    } else
    if (!!this.productsDictionary && this.node.type === NodeTypes.PRODUCT) {
      const content = this.productsDictionary[this.node.contentId];
      return !!content ? content.name : "";
    }

    return "";
  }

  onShowMenu(event: Event): void {
    event.stopImmediatePropagation();
    event.preventDefault();
  }

  onSetContent(event: Event, isEditMode = false): void {
    if (event) {
      event.stopImmediatePropagation();
      event.preventDefault();
    }

    const dialogRef = this.dialog.open(SetupNodeContentDialogComponent,
      {
        data: {
          title: "Select a content for the node.",
          products: this.products,
          selectors: this.selectors,
        },
      });

    dialogRef.afterClosed().pipe(
      take(1),
      takeUntil(this.unsubscribe$),
    ).subscribe(content => {
      if (!!content) {
        const node = {
          id: this.node.id,
          type: content.type,
          parentId: this.node.parentId,
          contentId: content.id,
          children: this.node.children,
        }
        this.update.emit(node);
      }
    });
  }

  onCreate(): void {
    const dialogRef = this.dialog.open(SetupNodeContentDialogComponent,
      {
        data: {
          title: "Select a content for the node.",
          products: this.products,
          selectors: this.selectors,
        },
      });

    dialogRef.afterClosed().pipe(
      take(1),
      takeUntil(this.unsubscribe$),
    ).subscribe(content => {
      if (!!content) {
        const node = {
          type: content.type,
          parentId: this.node.id,
          contentId: content.id,
          children: [],
        }
        this.create.emit(node);
      }
    });
  }

  onEdit(): void {

  }

  onDelete(): void {
    const dialogRef = this.dialog.open(DeleteEntityDialogComponent,
      {
        data: {
          title: "Delete the product?",
          message: `"${this.getContentName()}" will be permanently deleted. ${!!this.node.children && this.node.children.length > 0 ? "His children will be permanently deleted." : ""}`,
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
