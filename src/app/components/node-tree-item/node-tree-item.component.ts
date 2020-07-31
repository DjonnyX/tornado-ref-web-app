import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter, OnDestroy } from '@angular/core';
import { DeleteEntityDialogComponent } from '@components/dialogs/delete-entity-dialog/delete-entity-dialog.component';
import { take, takeUntil, map, filter } from 'rxjs/operators';
import { BaseComponent } from '@components/base/base-component';
import { MatDialog } from '@angular/material/dialog';
import { SetupNodeContentDialogComponent } from '@components/dialogs/setup-node-content-dialog/setup-node-content-dialog.component';
import { NodeTreeModes } from '@components/node-tree/enums/node-tree-modes.enum';
import { SelectContentFormModes } from '@components/forms/select-content-form/enums/select-content-form-modes.enum';
import { INode, IProduct, ISelector, IScenario, NodeTypes, IBusinessPeriod } from '@djonnyx/tornado-types';
import { EditScenarioDialogComponent } from '@components/dialogs/edit-scenario-dialog/edit-scenario-dialog.component';

const arrayItemToUpward = (array: Array<string>, item: string): Array<string> => {
  const collection = [...array];
  const index = collection.indexOf(item);
  if (index === 0) return collection;

  collection.splice(index, 1);
  collection.splice(index - 1, 0, item);

  return collection;
}

const arrayItemToDownward = (array: Array<string>, item: string): Array<string> => {
  const collection = [...array];
  const index = collection.indexOf(item);
  if (index === collection.length) return collection;

  collection.splice(index, 1);
  collection.splice(index + 1, 0, item);

  return collection;
}

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

  @Input() isInstanceChain: boolean;

  isLastChild: boolean;

  private _currentIndex: number = -1;
  @Input() set currentIndex(v: number) {
    if (this._currentIndex !== v) {
      this._currentIndex = v;

      this.resetIsLastChild();
    }
  }

  private _parentChildrenLength: number = -1;
  @Input() set parentChildrenLength(v: number) {
    if (this._parentChildrenLength !== v) {
      this._parentChildrenLength = v;

      this.resetIsLastChild();
    }
  }

  @Input() businessPeriods: Array<IBusinessPeriod>;
  
  @Input() businessPeriodsDictionary: {[id: string]: IBusinessPeriod};

  resetIsLastChild(): void {
    if (this._parentChildrenLength > -1 && this._currentIndex > -1) {
      this.isLastChild = this._currentIndex === this._parentChildrenLength - 1;
    }
  }

  isRoot: boolean;

  isFirstInCollection: boolean;

  isLastInCollection: boolean;

  hasNodeInstance: boolean;

  nodeInstance: INode;

  newScenario: IScenario;

  private _depth: number;
  @Input() set depth(v: number) {
    if (this._depth !== v) {
      this._depth = v;

      // this.isExpanded = this._depth <= 1;

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

  hasInstance(): boolean {
    const instanceNode = !!this._nodesDictionary ? this.nodesDictionary[this.node.contentId] : null;

    if (!!instanceNode) {
      return true;
    }

    return false;
  }

  toggleExpand(): void {
    this.isExpanded = !this.isExpanded;
  }

  resetNode(): void {
    this.node = !!this._nodesDictionary && !!this._id ? this.nodesDictionary[this._id] : null;

    if (!!this.node) {
      const parent = this._nodesDictionary[this.node.parentId];

      if (parent) {
        const indexInCollection = parent.children.indexOf(this.node.id);

        this.isFirstInCollection = indexInCollection === 0;
        this.isLastInCollection = indexInCollection === parent.children.length - 1;
      }

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
          selectedDefaultEntityId: this.node.contentId,
          defaultCollection: this.node.type,
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
          scenarios: this.node.scenarios,
        }
        this.update.emit(node);
      }
    });
  }

  onUpward(): void {
    const parent = this._nodesDictionary[this.node.parentId];
    const childrenOfParent = parent.children;
    const newChildrenOfParent = arrayItemToUpward(childrenOfParent, this.node.id);
    const node = {
      ...parent,
      children: newChildrenOfParent,
    }
    this.update.emit(node);
  }

  onDownward(): void {
    const parent = this._nodesDictionary[this.node.parentId];
    const childrenOfParent = parent.children;
    const newChildrenOfParent = arrayItemToDownward(childrenOfParent, this.node.id);
    const node = {
      ...parent,
      children: newChildrenOfParent,
    }
    this.update.emit(node);
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
          scenarios: [],
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

  onAddScenario(): void {
    const dialogRef = this.dialog.open(EditScenarioDialogComponent,
      {
        data: {
          title: "Configure the scenario.",
          scenario: undefined,
          businessPeriods: this.businessPeriods,
        },
      });

    dialogRef.afterClosed().pipe(
      take(1),
      takeUntil(this.unsubscribe$),
      filter(v => !!v),
      map(v => v as {content: IScenario, replacedScenario: IScenario}),
    ).subscribe(({content, replacedScenario}) => {
      if (!!content) {
        const scenario: IScenario = {
          action: content.action,
          value: content.value,
          extra: content.extra,
        };
        this.update.emit({...this.node, scenarios: [...this.node.scenarios, scenario]});
      }
    });
  }

  onDeleteScenarios(): void {
    this.update.emit({...this.node, scenarios: []});
  }

  onDeleteScenario(scenario: IScenario): void {
    const scenarios = [...this.node.scenarios];
    const index = scenarios.indexOf(scenario);

    if (index > -1) {
      scenarios.splice(index, 1);
    }

    this.update.emit({...this.node, scenarios});
  }

  onEditScenario(scenario: IScenario): void {

    const dialogRef = this.dialog.open(EditScenarioDialogComponent,
      {
        data: {
          title: "Edit the scenario.",
          scenario: scenario,
          businessPeriods: this.businessPeriods,
        },
      });

    dialogRef.afterClosed().pipe(
      take(1),
      takeUntil(this.unsubscribe$),
      filter(v => !!v),
      map(v => v as {content: IScenario, replacedScenario: IScenario}),
    ).subscribe(({content, replacedScenario}) => {
      if (!!content) {
        const scenarios = [...this.node.scenarios];
        const index = scenarios.indexOf(replacedScenario);
    
        if (index > -1) {
          scenarios[index] = content;
        }
    
        this.update.emit({...this.node, scenarios});
      }
    });
  }

  onUpwardScenario(scenario: IScenario): void {
    const scenarios = [...this.node.scenarios];
    const index = scenarios.indexOf(scenario);

    if (index > -1 && index > 0) {
      scenarios.splice(index, 1);
      scenarios.splice(index - 1, 0, scenario);
    }

    this.update.emit({...this.node, scenarios});
  }

  onDownwardScenario(scenario: IScenario): void {
    const scenarios = [...this.node.scenarios];
    const index = scenarios.indexOf(scenario);

    if (index > -1 && index < scenarios.length - 1) {
      scenarios.splice(index, 1);
      scenarios.splice(index + 1, 0, scenario);
    }

    this.update.emit({...this.node, scenarios});
  }
}
