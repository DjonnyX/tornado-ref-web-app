import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter, OnDestroy, ViewChild, ViewEncapsulation } from '@angular/core';
import { DeleteEntityDialogComponent } from '@components/dialogs/delete-entity-dialog/delete-entity-dialog.component';
import { interval } from 'rxjs';
import { take, takeUntil, map, filter } from 'rxjs/operators';
import { BaseComponent } from '@components/base/base-component';
import { MatDialog } from '@angular/material/dialog';
import { MatCheckbox } from '@angular/material/checkbox';
import { SetupNodeContentDialogComponent } from '@components/dialogs/setup-node-content-dialog/setup-node-content-dialog.component';
import { NodeTreeModes } from '@components/node-tree/enums/node-tree-modes.enum';
import { SelectContentFormRights } from '@components/forms/select-content-form/enums/select-content-form-modes.enum';
import { INode, IProduct, ISelector, IScenario, NodeTypes, IBusinessPeriod, IAsset, SelectorTypes } from '@djonnyx/tornado-types';
import { EditScenarioDialogComponent } from '@components/dialogs/edit-scenario-dialog/edit-scenario-dialog.component';
import { NodeScenarioTypes } from '@enums/node-scenario-types';

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
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NodeTreeItemComponent extends BaseComponent implements OnInit, OnDestroy {
  @ViewChild("checkboxActive", { read: MatCheckbox }) private _checkboxActive: MatCheckbox;

  @Input() type: NodeTypes | string;

  @Input() nodes: Array<INode>;

  @Input() products: Array<IProduct>;

  @Input() selectors: Array<ISelector>;

  /**
   * Передаются либо селекторы меню, либо селекторы схем модификаторов
   * Определение что именно передается по <code>mode</code>
   */
  @Input() additionalSelectors: Array<ISelector>;

  @Input() isDisabled: boolean;

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

  @Input() businessPeriodsDictionary: { [id: string]: IBusinessPeriod };

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

  @Input() additionalSelectorsDictionary: { [id: string]: ISelector };

  @Input() assetsDictionary: { [id: string]: IAsset };

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

    this.isSearchExpanded = false;
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

      if (this.mode === NodeTreeModes.MENU && this.node.type === NodeTypes.PRODUCT) {
        this.isExpanded = false;
      }
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

  getThumbnail(): string {
    if (!!this.assetsDictionary && !!this.productsDictionary && this.node.type === NodeTypes.PRODUCT) {
      const content = this.productsDictionary[this.node.contentId];

      if (content && content.mainAsset && this.assetsDictionary[content.mainAsset]) {
        return this.assetsDictionary[content.mainAsset].mipmap.x32;
      }
    }

    return "";
  }

  getContentName(): string {
    const content = this.getContent();
    return !!content ? content.name : "";
  }

  getContent(): IProduct | ISelector | null {
    if (!!this.selectorsDictionary && this.node.type === NodeTypes.SELECTOR) {
      return this.selectorsDictionary[this.node.contentId];
    } else
      if (!!this.productsDictionary && this.node.type === NodeTypes.PRODUCT) {
        return this.productsDictionary[this.node.contentId];
      } else
        if (!!this._nodesDictionary && this.node.type === NodeTypes.SELECTOR_NODE) {
          const content = this._nodesDictionary[this.node.contentId];
          const contentId = content.contentId;
          if (!!contentId && !!this.selectorsDictionary) {
            return this.selectorsDictionary[content.contentId];
          }
        }

    return null;
  }

  onSearchExpand(isExpanded: boolean): void {
    interval(1).pipe(
      take(1),
      takeUntil(this.unsubscribe$),
    ).subscribe(() => {
      this.isSearchExpanded = isExpanded;

      this.searchExpand.emit(this.isSearchExpanded);
    })
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

    const rights = this.getRights();

    const content = this.getContent();

    const dialogRef = this.dialog.open(SetupNodeContentDialogComponent,
      {
        data: {
          title: "Select a content for the node.",
          products: this.products,
          selectors: this.selectors.filter(selector => selector.type === SelectorTypes.MENU_CATEGORY),
          selectorsDictionary: this.selectorsDictionary,
          schemaSelectors: this.selectors.filter(selector => selector.type === SelectorTypes.SCHEMA_CATEGORY),
          selectedDefaultEntityId: this.node.contentId,
          defaultCollection: this.node.type === NodeTypes.SELECTOR && !!content ? (content as ISelector).type : this.node.type,
          nodes: this.nodes,
          rights,
        },
      });

    dialogRef.afterClosed().pipe(
      take(1),
      takeUntil(this.unsubscribe$),
    ).subscribe(content => {
      if (!!content) {
        const node = {
          id: this.node.id,
          active: this.node.active,
          type: content.type,
          parentId: this.node.parentId,
          contentId: content.id,
          children: this.node.children,
          scenarios: [],
          extra: this.node.extra,
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
    const rights = this.getRights();

    const dialogRef = this.dialog.open(SetupNodeContentDialogComponent,
      {
        data: {
          title: "Select a content for the node.",
          selectors: this.selectors.filter(selector => selector.type === SelectorTypes.MENU_CATEGORY),
          selectorsDictionary: this.selectorsDictionary,
          schemaSelectors: this.selectors.filter(selector => selector.type === SelectorTypes.SCHEMA_CATEGORY),
          nodes: this.nodes,
          rights,
        },
      });

    dialogRef.afterClosed().pipe(
      take(1),
      takeUntil(this.unsubscribe$),
    ).subscribe(content => {
      if (!!content) {
        const node = {
          active: true,
          type: content.type,
          parentId: this.node.id,
          contentId: content.id,
          children: [],
          scenarios: [],
          extra: {},
        }
        this.create.emit(node);
      }
    });
  }

  onEdit(): void {

  }

  onToggleActive(event?: Event): void {
    if (event) {
      event.stopImmediatePropagation();
      event.preventDefault();
    }

    this.update.emit({ ...this.node, active: !this.node.active });
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
          type: this.getNodeScenarioType(),
          title: "Configure the scenario.",
          scenario: undefined,
          businessPeriods: this.businessPeriods,
        },
      });

    dialogRef.afterClosed().pipe(
      take(1),
      takeUntil(this.unsubscribe$),
      filter(v => !!v),
      map(v => v as { content: IScenario, replacedScenario: IScenario }),
    ).subscribe(({ content, replacedScenario }) => {
      if (!!content) {
        const scenario: IScenario = {
          active: true,
          action: content.action,
          value: content.value,
          extra: content.extra,
        };
        this.update.emit({ ...this.node, scenarios: [...this.node.scenarios, scenario] });
      }
    });
  }

  onDeleteScenarios(): void {
    this.update.emit({ ...this.node, scenarios: [] });
  }

  onDeleteScenario(scenario: IScenario): void {
    const scenarios = [...this.node.scenarios];
    const index = scenarios.indexOf(scenario);

    if (index > -1) {
      scenarios.splice(index, 1);
    }

    this.update.emit({ ...this.node, scenarios });
  }

  onUpdateScenario(scenarios: Array<IScenario>): void {
    this.update.emit({ ...this.node, scenarios });
  }

  onEditScenario(scenario: IScenario): void {

    const dialogRef = this.dialog.open(EditScenarioDialogComponent,
      {
        data: {
          type: this.getNodeScenarioType(),
          title: "Edit the scenario.",
          scenario: scenario,
          businessPeriods: this.businessPeriods,
        },
      });

    dialogRef.afterClosed().pipe(
      take(1),
      takeUntil(this.unsubscribe$),
      filter(v => !!v),
      map(v => v as { content: IScenario, replacedScenario: IScenario }),
    ).subscribe(({ content, replacedScenario }) => {
      if (!!content) {
        const scenarios = [...this.node.scenarios];
        const index = scenarios.indexOf(replacedScenario);

        if (index > -1) {
          scenarios[index] = content;
        }

        this.update.emit({ ...this.node, scenarios });
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

    this.update.emit({ ...this.node, scenarios });
  }

  onDownwardScenario(scenario: IScenario): void {
    const scenarios = [...this.node.scenarios];
    const index = scenarios.indexOf(scenario);

    if (index > -1 && index < scenarios.length - 1) {
      scenarios.splice(index, 1);
      scenarios.splice(index + 1, 0, scenario);
    }

    this.update.emit({ ...this.node, scenarios });
  }

  private getRights(): Array<SelectContentFormRights> {
    const rights = new Array<SelectContentFormRights>();

    if (this.mode === NodeTreeModes.PRODUCT) {
      rights.push(SelectContentFormRights.SCHEMA_CATEGORY);
    }

    rights.push(SelectContentFormRights.CATEGORIES);

    if (this.mode === NodeTreeModes.MENU) {
      if (!(this.node.children && this.node.children.length > 0)) {
        rights.push(SelectContentFormRights.PRODUCTS);
      }
    } else {
      rights.push(SelectContentFormRights.PRODUCTS);
    }

    rights.push(SelectContentFormRights.NODES);

    return rights;
  }

  private getNodeScenarioType(): NodeScenarioTypes {
    if (this.mode === NodeTreeModes.MENU) {
      switch (this.node.type) {
        case NodeTypes.PRODUCT:
          return NodeScenarioTypes.PRODUCT;
        case NodeTypes.SELECTOR:
        case NodeTypes.SELECTOR_NODE:
          return NodeScenarioTypes.CATEGORY;
      }
    } else
      if (this.mode === NodeTreeModes.PRODUCT) {
        switch (this.node.type) {
          case NodeTypes.PRODUCT:
            return NodeScenarioTypes.PRODUCT_IN_SCHEMA;
          case NodeTypes.SELECTOR:
          case NodeTypes.SELECTOR_NODE:
          case NodeTypes.PRODUCT_JOINT:
            return NodeScenarioTypes.CATEGORY_IN_SCHEMA;
        }
      }
  }
}
