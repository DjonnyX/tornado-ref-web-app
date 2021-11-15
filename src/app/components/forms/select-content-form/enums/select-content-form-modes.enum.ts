/**
 * Алиас для NodeTreeModes
 */

export enum SelectContentFormModes {
    /**
     * NodeTypes.PRODUCT
     */
    SCHEMA_MODIFIERS = "product",
    /**
     * NodeTypes.SELECTOR
     */
    SCHEMA_GROUP_MODIFIERS = "schema",
    /**
     * NodeTypes.SELECTOR && Selector.type === SelectorTypes.SCHEMA_CATEGORY
     */
    GROUP_MODIFIERS = "selector",
    /**
     * MenuTree
     */
    MENU = "menu",
}