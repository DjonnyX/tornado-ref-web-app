export enum NodeTypes {
    /**
     * корневой нод дерева меню киоска
     */
    KIOSK_ROOT = "kiosk-root",
    /**
     * контент является селектором
     */
    SELECTOR = "selector",
    /**
     * контент является продуктом
     */
    PRODUCT = "product",
    /**
     * корневой нод продукта
     */
    PRODUCT_JOINT = "product-joint",
    /**
     * корневой нод селектора
     */
    SELECTOR_JOINT = "selector-joint",
    /**
     * контент является нодом ссылающимся на селектор
     */
    SELECTOR_NODE = "selector-node",
}