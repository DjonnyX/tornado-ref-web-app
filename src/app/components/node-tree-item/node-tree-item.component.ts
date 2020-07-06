import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter, OnDestroy } from '@angular/core';
import { NodeTypes } from '@app/enums/node-types.enum';
import { INode, ISelector, IProduct } from '@models';
import { DeleteEntityDialogComponent } from '@components/dialogs/delete-entity-dialog/delete-entity-dialog.component';
import { take, takeUntil } from 'rxjs/operators';
import { BaseComponent } from '@components/base/base-component';
import { MatDialog } from '@angular/material/dialog';
import { SetupNodeContentDialogComponent } from '@components/dialogs/setup-node-content-dialog/setup-node-content-dialog.component';
import { NodeTreeModes } from '@components/node-tree/enums/node-tree-modes.enum';
import { SelectContentFormModes } from '@components/forms/select-content-form/enums/select-content-form-modes.enum';

@Component({
  selector: 'ta-node-tree-item',
  templateUrl: './node-tree-item.component.html',
  styleUrls: ['./node-tree-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NodeTreeItemComponent extends BaseComponent implements OnInit, OnDestroy {
  @Input() type: NodeTypes | string;

  @Input() nodes: Array<INode>;

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

  get nodesDictionary() { return this._nodesDictionary; }

  @Input() lock: boolean;

  isRoot: boolean;

  hasNodeInstance: boolean;

  nodeInstance: INode;

  private _depth: number;
  @Input() set depth(v: number) {
    if (this._depth !== v) {
      this._depth = v;

      this.isExpanded = this._depth <= 1;

      this.isRoot = this._depth === 0;
    }
  }

  @Input() productsDictionary: { [id: string]: IProduct };

  @Input() selectorsDictionary: { [id: string]: ISelector };

  @Output() create = new EventEmitter<INode>();

  @Output() update = new EventEmitter<INode>();

  @Output() delete = new EventEmitter<INode>();

  @Output() searchExpand = new EventEmitter<boolean>();

  private _searchPattern: string;
  @Input() set searchPattern(pattern: string) {
    this._searchPattern = pattern;

    if (pattern) {
      const contentName = this.getContentName();
      if (contentName.toLocaleLowerCase().indexOf(pattern.toLocaleLowerCase()) > -1) {
        this.isSearchExpanded = true;

        this.searchExpand.emit(true);
        return;
      }
    }

    this.searchExpand.emit(false);
  }

  get searchPattern() {
    return this._searchPattern;
  }

  @Input() mode: NodeTreeModes;

  isExpanded = true;

  /**
   * Для автораскрытия при поиске
   */
  isSearchExpanded = false;

  constructor(public dialog: MatDialog) {
    super();
  }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  hasAllowSubCreation(): boolean {
    if (this.mode === NodeTreeModes.MENU && this.node.type === NodeTypes.PRODUCT) {
      return false;
    }

    return true;
  }

  toggleExpand(): void {
    this.isExpanded = !this.isExpanded;
  }

  resetNode(): void {
    this.node = !!this._nodesDictionary && !!this._id ? this.nodesDictionary[this._id] : null;

    if (!!this.node) {
      this.nodeInstance = this.getNodeInstance();
      this.hasNodeInstance = !!this.nodeInstance;
    }
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

  private getNodeInstance(): INode {
    if (!!this._nodesDictionary && this.node.type === NodeTypes.SELECTOR_NODE) {
      return this._nodesDictionary[this.node.contentId];
    }

    return undefined;
  }

  getContentName(): string {
    if (!!this.selectorsDictionary && this.node.type === NodeTypes.SELECTOR) {
      const content = this.selectorsDictionary[this.node.contentId];
      return !!content ? content.name : "";
    } else
      if (!!this.productsDictionary && this.node.type === NodeTypes.PRODUCT) {
        const content = this.productsDictionary[this.node.contentId];
        return !!content ? content.name : "";
      } else
        if (!!this._nodesDictionary && this.node.type === NodeTypes.SELECTOR_NODE) {
          const content = this._nodesDictionary[this.node.contentId];
          const contentId = content.contentId;
          if (!!contentId && !!this.selectorsDictionary) {
            const selector = this.selectorsDictionary[content.contentId];
            return !!selector ? selector.name : "";
          }
        }

    return "";
  }

  onSearchExpand(isExpanded: boolean): void {
    this.isSearchExpanded = isExpanded;
  }

  onShowMenu(event: Event): void {
    event.stopImmediatePropagation();
    event.preventDefault();
  }

  onSetContent(event?: Event): void {
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
          selectorsDictionary: this.selectorsDictionary,
          nodes: this.nodes,
          mode: this.node.children && this.node.children.length > 0 ? SelectContentFormModes.ONLY_SELECTORS : SelectContentFormModes.ALL,
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
          selectorsDictionary: this.selectorsDictionary,
          nodes: this.nodes,
          mode: SelectContentFormModes.ALL,
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
