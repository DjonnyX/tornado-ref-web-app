import {
  Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter, OnDestroy, ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { DeleteEntityDialogComponent } from '@components/dialogs/delete-entity-dialog/delete-entity-dialog.component';
import { interval } from 'rxjs';
import { take, takeUntil, map, filter } from 'rxjs/operators';
import { BaseComponent } from '@components/base/base-component';
import { MatDialog } from '@angular/material/dialog';
import { SetupNodeContentDialogComponent } from '@components/dialogs/setup-node-content-dialog/setup-node-content-dialog.component';
import { NodeTreeModes } from '@components/node-tree/enums/node-tree-modes.enum';
import {
  INode, IProduct, ISelector, IScenario, NodeTypes, IBusinessPeriod, IAsset, SelectorTypes, ICurrency,
  ILanguage, IOrderType, IStore, ScenarioCommonActionTypes, IEntity
} from '@djonnyx/tornado-types';
import { EditScenarioDialogComponent } from '@components/dialogs/edit-scenario-dialog/edit-scenario-dialog.component';
import { NodeScenarioTypes } from '@enums/node-scenario-types';
import { ICollectionDictionary } from '@app/utils/collection.util';
import { NodeTreeStores } from '@components/node-tree/enums/node-tree-stores.enum';
import { Router } from '@angular/router';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { LocalizationService } from '@app/services/localization/localization.service';

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
  readonly NodeTypes = NodeTypes;

  @Input() type: NodeTypes | string;

  @Input() nodes: Array<INode>;

  @Input() groupModifiersNodes: Array<INode>;

  @Input() groupMenuNodes: Array<INode>;

  @Input() products: Array<IProduct>;

  @Input() selectors: Array<ISelector>;

  @Input() menuGroupsSelectors: Array<ISelector>;

  @Input() modifiersGroupsSelectors: Array<ISelector>;

  @Input() currencies: Array<ICurrency>;

  @Input() currenciesDictionary: ICollectionDictionary<ICurrency>;

  @Input() orderTypes: Array<IOrderType>;

  @Input() orderTypesDictionary: ICollectionDictionary<IOrderType>;

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

  private _nodesDictionary: ICollectionDictionary<INode>;
  @Input() set nodesDictionary(v: ICollectionDictionary<INode>) {
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

  @Input() stores: Array<IStore>;

  @Input() storesDictionary: ICollectionDictionary<IStore>;

  @Input() businessPeriods: Array<IBusinessPeriod>;

  @Input() businessPeriodsDictionary: ICollectionDictionary<IBusinessPeriod>;

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
  get depth() { return this._depth; }

  @Input() productsDictionary: ICollectionDictionary<IProduct>;

  @Input() selectorsDictionary: ICollectionDictionary<ISelector>;

  @Input() additionalSelectorsDictionary: ICollectionDictionary<ISelector>;

  @Input() assetsDictionary: ICollectionDictionary<IAsset>;

  @Input() defaultLanguage: ILanguage;

  @Input() languages: Array<ILanguage>;

  @Input() languagesDictionary: ICollectionDictionary<IAsset>;

  @Output() create = new EventEmitter<Array<INode>>();

  @Output() update = new EventEmitter<INode>();

  @Output() delete = new EventEmitter<INode>();

  @Output() searchExpand = new EventEmitter<boolean>();

  private _searchPattern: string;
  @Input() set searchPattern(pattern: string) {
    this._searchPattern = pattern;

    if (pattern) {
      const contentName = this.getContentName();
      if (contentName.toLocaleLowerCase().indexOf(pattern.toLocaleLowerCase()) > -1) {
        this.isSearchMatch = this.isSearchExpanded = true;

        this.searchExpand.emit(true);

        return;
      }
    }

    this.isSearchMatch = this.isSearchExpanded = false;
    this.searchExpand.emit(false);
  }

  get searchPattern() {
    return this._searchPattern;
  }

  get isStoreContain(): boolean {
    if (this.currentStoreId !== NodeTreeStores.ALL) {
      if (this.node?.scenarios?.length) {
        for (let i = 0, l = this.node.scenarios.length; i < l; i++) {
          const scenario = this.node.scenarios[i];

          if (scenario.action === ScenarioCommonActionTypes.VISIBLE_BY_STORE) {
            const availableStores = scenario.value as Array<string>;

            let isVisible = availableStores.indexOf(this.currentStoreId) > -1;
            if (!isVisible) {
              return isVisible;
            }
          }
        }
      }

      if (this.node.type === NodeTypes.PRODUCT) {
        const product = this.productsDictionary[this.node.contentId];
        if (!!product?.joint) {
          const productJoint = this.nodesDictionary[product.joint];
          if (productJoint?.scenarios?.length) {
            for (let i = 0, l = productJoint.scenarios.length; i < l; i++) {
              const scenario = productJoint.scenarios[i];

              if (scenario.action === ScenarioCommonActionTypes.VISIBLE_BY_STORE) {
                const availableStores = scenario.value as Array<string>;

                const isVisibleJoint = availableStores.indexOf(this.currentStoreId) > -1;
                if (!isVisibleJoint) {
                  return isVisibleJoint;
                }
              }
            }
          }
        }
      }
    }

    return true;
  }

  @Input() mode: NodeTreeModes;

  @Input() currentStoreId: string;

  isSearchMatch: boolean;

  isExpanded = true;

  /**
   * Для автораскрытия при поиске
   */
  isSearchExpanded = false;

  constructor(
    public dialog: MatDialog,
    private _router: Router,
    public readonly localization: LocalizationService,
  ) {
    super();
  }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  hasAllowSubCreation(): boolean {
    if ((this.mode === NodeTreeModes.MENU || this.mode === NodeTreeModes.PRODUCT || this.mode === NodeTreeModes.SELECTOR)
      && this.node.type === NodeTypes.PRODUCT) {
      return false;
    }

    return true;
  }

  hasInstance(): boolean {
    const instanceNode = !!this._nodesDictionary ? this._nodesDictionary[this.node.contentId] : null;

    if (!!instanceNode) {
      return true;
    }

    return false;
  }

  toggleExpand(): void {
    this.isExpanded = !this.isExpanded;
  }

  resetNode(): void {
    this.node = !!this._nodesDictionary && !!this._id ? this._nodesDictionary[this._id] : null;

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

  createNodeForChild(nodes: Array<INode>): void {
    this.create.emit(nodes);
  }

  updateNodeForChild(node: INode): void {
    this.update.emit(node);
  }

  deleteNodeForChild(node: INode): void {
    this.delete.emit(node);
  }

  onNavigateToContent(): void {
    if (this.node.type === NodeTypes.PRODUCT) {
      this._router.navigate(["/admin/products/edit"], {
        queryParams: { id: this.node.contentId },
      });
    } else if (this.node.type === NodeTypes.SELECTOR) {
      const selector = this.selectorsDictionary[this.node.contentId];
      if (!!selector) {
        if (selector.type === SelectorTypes.MENU_CATEGORY) {
          this._router.navigate(["/admin/menu-categories/edit"], {
            queryParams: { id: this.node.contentId },
          });
        } else if (selector.type === SelectorTypes.SCHEMA_CATEGORY) {
          this._router.navigate(["/admin/schema-categories/edit"], {
            queryParams: { id: this.node.contentId },
          });
        }
      }
    } else if (this.node.type === NodeTypes.SELECTOR_NODE) {
      const node = this._nodesDictionary[this.node.contentId];
      if (!!node) {
        const selector = this.selectorsDictionary[node.contentId];
        if (!!selector) {
          if (selector.type === SelectorTypes.MENU_CATEGORY) {
            this._router.navigate(["/admin/menu-tree"]);
          } else if (selector.type === SelectorTypes.SCHEMA_CATEGORY) {
            this._router.navigate(["/admin/schema-categories/edit"], {
              queryParams: { id: selector.id },
            });
          }
        }
      }
    }
  }

  private getNodeInstance(): INode {
    if (!!this._nodesDictionary && this.node.type === NodeTypes.SELECTOR_NODE) {
      return this._nodesDictionary[this.node.contentId];
    }

    return undefined;
  }

  getThumbnail(): string {
    if (!!this.assetsDictionary) {
      if (!!this.productsDictionary && this.node.type === NodeTypes.PRODUCT) {
        const content = this.productsDictionary[this.node.contentId];

        if (!!content && !!content.contents[this.defaultLanguage?.code]?.resources?.main && this.assetsDictionary[content.contents[this.defaultLanguage?.code]?.resources?.main]) {
          return this.assetsDictionary[content.contents[this.defaultLanguage?.code]?.resources?.main]?.mipmap?.x32;
        }
      } else
        if (!!this.selectorsDictionary) {
          if (this.node.type === NodeTypes.SELECTOR) {
            const content = this.selectorsDictionary[this.node.contentId];

            if (!!content && !!content.contents[this.defaultLanguage?.code]?.resources?.main && this.assetsDictionary[content.contents[this.defaultLanguage?.code]?.resources?.main]) {
              return this.assetsDictionary[content.contents[this.defaultLanguage?.code]?.resources?.main]?.mipmap?.x32;
            }
          }
          if (this.node.type === NodeTypes.SELECTOR_NODE) {
            const node = this._nodesDictionary[this.node.contentId];
            if (!!node) {
              const content = this.selectorsDictionary[node.contentId];

              if (!!content && !!content.contents[this.defaultLanguage?.code]?.resources?.main && this.assetsDictionary[content.contents[this.defaultLanguage?.code]?.resources?.main]) {
                return this.assetsDictionary[content.contents[this.defaultLanguage?.code]?.resources?.main]?.mipmap?.x32;
              }
            }
          }
        }
    }

    return "";
  }

  getContentName(): string {
    const content = this.getContent();
    return !!content ? content.contents[this.defaultLanguage?.code]?.name || "" : "";
  }

  getContent(): IProduct | ISelector | null {
    if (!!this.selectorsDictionary && this.node.type === NodeTypes.SELECTOR) {
      return this.selectorsDictionary[this.node.contentId];
    } else
      if (!!this.productsDictionary && this.node.type === NodeTypes.PRODUCT) {
        return this.productsDictionary[this.node.contentId];
      } else
        if (!!this._nodesDictionary && this.node.type === NodeTypes.SELECTOR_NODE) {
          const content = this._nodesDictionary[this.node?.contentId];
          const contentId = content?.contentId;
          if (!!contentId && !!this.selectorsDictionary) {
            return this.selectorsDictionary[contentId];
          }
        }

    return null;
  }

  getRootName(): string {
    if (this.node.type === NodeTypes.SELECTOR_JOINT) {
      return "Группа";
    } else if (this.node.type === NodeTypes.PRODUCT_JOINT) {
      return "Товар";
    } else if (this.node.type === NodeTypes.KIOSK_ROOT) {
      return "Меню";
    }

    return "Корень";
  }

  getStyleClasses(): any {
    let type: string = "root";
    if (this.node.type === NodeTypes.SELECTOR || this.node.type === NodeTypes.SELECTOR_JOINT) {
      type = "folder";
    } else if (this.node.type === NodeTypes.PRODUCT || this.node.type === NodeTypes.PRODUCT_JOINT) {
      type = "product";
    } else if (this.node.type === NodeTypes.KIOSK_ROOT) {
      type = "root";
    }

    return { "node-tree-item": true, [type]: true };
  }

  onSearchExpand(isExpanded: boolean): void {
    interval(1).pipe(
      take(1),
      takeUntil(this.unsubscribe$),
    ).subscribe(() => {

      if (this._searchPattern) {
        const contentName = this.getContentName();
        if (contentName.toLocaleLowerCase().indexOf(this._searchPattern.toLocaleLowerCase()) > -1) {
          this.isSearchMatch = this.isSearchExpanded = true;

          this.searchExpand.emit(true);

          return;
        }
      }

      this.isSearchMatch = false;

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

    if (this.lock) {
      return;
    }

    const content = this.getContent();

    const nodeInstance = this._nodesDictionary[this.node?.contentId];

    const dialogRef = this.dialog.open(SetupNodeContentDialogComponent,
      {
        data: {
          title: "common_dialog-choose-a-content-for-node",
          assetsDictionary: this.assetsDictionary,
          products: this.products,
          groupModifiersNodes: this.groupModifiersNodes,
          groupMenuNodes: this.groupMenuNodes,
          selectors: this.menuGroupsSelectors,
          selectorsDictionary: this.selectorsDictionary,
          schemaSelectors: this.modifiersGroupsSelectors,
          selectedDefaultEntityId: this.node.contentId,
          defaultCollection: this.node.type === NodeTypes.SELECTOR && !!content ?
            (content as ISelector).type :
            !!nodeInstance && nodeInstance.type === NodeTypes.SELECTOR_JOINT ?
              NodeTypes.SELECTOR_JOINT :
              this.node.type,
          languages: this.languages,
          defaultLanguage: this.defaultLanguage,
          nodes: this.nodes,
          mode: this.mode,
          depth: this._depth - 1,
        },
      });

    dialogRef.afterClosed().pipe(
      take(1),
      takeUntil(this.unsubscribe$),
    ).subscribe(cnt => {
      if (!!cnt) {
        const node = {
          id: this.node.id,
          active: this.node.active,
          type: cnt.type,
          parentId: this.node.parentId,
          contentId: cnt.id,
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
    const dialogRef = this.dialog.open(SetupNodeContentDialogComponent,
      {
        data: {
          title: "common_dialog-choose-a-content-for-node",
          multi: true,
          assetsDictionary: this.assetsDictionary,
          products: this.products,
          selectors: this.menuGroupsSelectors,
          selectorsDictionary: this.selectorsDictionary,
          schemaSelectors: this.modifiersGroupsSelectors,
          languages: this.languages,
          defaultLanguage: this.defaultLanguage,
          nodes: this.nodes,
          groupModifiersNodes: this.groupModifiersNodes,
          groupMenuNodes: this.groupMenuNodes,
          mode: this.mode,
          depth: this._depth,
        },
      });

    dialogRef.afterClosed().pipe(
      take(1),
      takeUntil(this.unsubscribe$),
    ).subscribe((content: Array<any>) => {
      if (!!content) {
        const nodes = content.map(i => ({
          active: true,
          type: i.type,
          parentId: this.node.id,
          contentId: i.id,
          children: [],
          scenarios: [],
          extra: {},
        }));
        this.create.emit(nodes);
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
          title: "common_dialog-delete-the-content",
          message: `#{"${this.getContentName()}"} common_action-will-be-permanently-deleted. ${!!this.node.children && this.node.children.length > 0 ? "common_dialog-his-children-will-be-permanently-deleted." : ""}`,
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
          title: "common_dialog-setup-scenario",
          scenario: undefined,
          scenarios: this.node.scenarios,
          businessPeriods: this.businessPeriods,
          businessPeriodsDictionary: this.businessPeriodsDictionary,
          orderTypes: this.orderTypes,
          orderTypesDictionary: this.orderTypesDictionary,
          currencies: this.currencies,
          currenciesDictionary: this.currenciesDictionary,
          languages: this.languages,
          languagesDictionary: this.languagesDictionary,
          products: this.products,
          productsDictionary: this.productsDictionary,
          selectors: this.selectors,
          selectorsDictionary: this.selectorsDictionary,
          stores: this.stores,
          defaultLanguage: this.defaultLanguage,
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
          lock: false,
          action: content.action,
          value: content.value,
          extra: content.extra,
        };
        this.update.emit({ ...this.node, scenarios: [...this.node.scenarios, scenario] });
      }
    });
  }

  onDeleteScenarios(): void {
    const dialogRef = this.dialog.open(DeleteEntityDialogComponent,
      {
        data: {
          title: "common_dialog-delete-all-scenarios",
          message: "common_dialog-scenarios-will-be-permanently-deleted.",
        },
      });

    dialogRef.afterClosed().pipe(
      take(1),
      takeUntil(this.unsubscribe$),
    ).subscribe(result => {
      if (result) {
        this.update.emit({ ...this.node, scenarios: [] });
      }
    });
  }

  onDeleteScenario(scenario: IScenario): void {
    const dialogRef = this.dialog.open(DeleteEntityDialogComponent,
      {
        data: {
          title: "common_dialog-delete-the-scenario",
          message: "common_dialog-scenario-will-be-permanently-deleted.",
        },
      });

    dialogRef.afterClosed().pipe(
      take(1),
      takeUntil(this.unsubscribe$),
    ).subscribe(result => {
      if (result) {
        const scenarios = [...this.node.scenarios];
        const index = scenarios.indexOf(scenario);

        if (index > -1) {
          scenarios.splice(index, 1);
        }

        this.update.emit({ ...this.node, scenarios });
      }
    });
  }

  onUpdateScenario(scenarios: Array<IScenario>): void {
    this.update.emit({ ...this.node, scenarios });
  }

  onEditScenario(scenario: IScenario): void {

    const dialogRef = this.dialog.open(EditScenarioDialogComponent,
      {
        data: {
          type: this.getNodeScenarioType(),
          title: "common_dialog-edit-scenario",
          scenario: scenario,
          scenarios: this.node.scenarios,
          stores: this.stores,
          orderTypes: this.orderTypes,
          businessPeriods: this.businessPeriods,
          currencies: this.currencies,
          languages: this.languages,
          defaultLanguage: this.defaultLanguage,
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
            return NodeScenarioTypes.CATEGORY_IN_SCHEMA;
          case NodeTypes.PRODUCT_JOINT:
            return NodeScenarioTypes.PRODUCT;
        }
      } else
        if (this.mode === NodeTreeModes.SELECTOR) {
          switch (this.node.type) {
            case NodeTypes.PRODUCT:
              return NodeScenarioTypes.PRODUCT_IN_SCHEMA;
            case NodeTypes.SELECTOR_JOINT:
              return NodeScenarioTypes.CATEGORY_IN_SCHEMA;
          }
        }
  }

  drop(event: CdkDragDrop<string[]>) {
    let actualNode: INode;
    if (this.node.type === NodeTypes.SELECTOR_NODE) {
      actualNode = this._nodesDictionary[this.node.contentId];
    } else {
      actualNode = this.node;
    }
    const collection = [...(actualNode.children || [])];
    const node = collection[event.previousIndex];
    collection.splice(event.previousIndex, 1);
    collection.splice(event.currentIndex, 0, node);
    this.update.emit({
      ...actualNode,
      children: collection,
    });
  }
}
