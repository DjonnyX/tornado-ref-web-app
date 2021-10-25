import { UserRights } from "@djonnyx/tornado-types";

export interface IUserRightData {
    name: string;
    value: number;
}

export const rightsFromDefaultWithout = (without: Array<UserRights>): Array<IUserRightData> => {
    const result = [...USER_RIGHTS_LIST];
    without?.forEach(w => {
        const index = result.findIndex(item => item.value === w);
        if (index > -1) {
            result.splice(index, 1);
        }
    });

    return result;
}

export const USER_RIGHTS_LIST: Array<IUserRightData> = [
    // Backups
    {
        name: "VIEW_BACKUPS",
        value: UserRights.VIEW_BACKUPS,
    },
    {
        name: "FORM_BACKUP",
        value: UserRights.FORM_BACKUP,
    },
    {
        name: "UPLOAD_BACKUP",
        value: UserRights.UPLOAD_BACKUP,
    },
    // Licenses
    {
        name: "READ_LICENSES",
        value: UserRights.READ_LICENSES,
    },
    {
        name: "READ_LICENSE",
        value: UserRights.READ_LICENSE,
    },
    {
        name: "CREATE_LICENSE",
        value: UserRights.CREATE_LICENSE,
    },
    {
        name: "UPDATE_LICENSE",
        value: UserRights.UPDATE_LICENSE,
    },
    {
        name: "DELETE_LICENSE",
        value: UserRights.DELETE_LICENSE,
    },
    {
        name: "REVOKE_LICENSE",
        value: UserRights.REVOKE_LICENSE,
    },
    // Languages
    {
        name: "READ_LANGUAGES",
        value: UserRights.READ_LANGUAGES,
    },
    {
        name: "READ_LANGUAGE",
        value: UserRights.READ_LANGUAGE,
    },
    {
        name: "CREATE_LANGUAGE",
        value: UserRights.CREATE_LANGUAGE,
    },
    {
        name: "UPDATE_LANGUAGE",
        value: UserRights.UPDATE_LANGUAGE,
    },
    {
        name: "DELETE_LANGUAGE",
        value: UserRights.DELETE_LANGUAGE,
    },
    // Tags
    {
        name: "READ_TAGS",
        value: UserRights.READ_TAGS,
    },
    {
        name: "READ_TAG",
        value: UserRights.READ_TAG,
    },
    {
        name: "CREATE_TAG",
        value: UserRights.CREATE_TAG,
    },
    {
        name: "UPDATE_TAG",
        value: UserRights.UPDATE_TAG,
    },
    {
        name: "DELETE_TAG",
        value: UserRights.DELETE_TAG,
    },
    // Products
    {
        name: "READ_PRODUCTS",
        value: UserRights.READ_PRODUCTS,
    },
    {
        name: "READ_PRODUCT",
        value: UserRights.READ_PRODUCT,
    },
    {
        name: "CREATE_PRODUCT",
        value: UserRights.CREATE_PRODUCT,
    },
    {
        name: "UPDATE_PRODUCT",
        value: UserRights.UPDATE_PRODUCT,
    },
    {
        name: "DELETE_PRODUCT",
        value: UserRights.DELETE_PRODUCT,
    },
    // Selectors
    {
        name: "READ_SELECTORS",
        value: UserRights.READ_SELECTORS,
    },
    {
        name: "READ_SELECTOR",
        value: UserRights.READ_SELECTOR,
    },
    {
        name: "CREATE_SELECTOR",
        value: UserRights.CREATE_SELECTOR,
    },
    {
        name: "UPDATE_SELECTOR",
        value: UserRights.UPDATE_SELECTOR,
    },
    {
        name: "DELETE_SELECTOR",
        value: UserRights.DELETE_SELECTOR,
    },
    // Currencies
    {
        name: "READ_CURRENCIES",
        value: UserRights.READ_CURRENCIES,
    },
    {
        name: "READ_CURRENCY",
        value: UserRights.READ_CURRENCY,
    },
    {
        name: "CREATE_CURRENCY",
        value: UserRights.CREATE_CURRENCY,
    },
    {
        name: "UPDATE_CURRENCY",
        value: UserRights.UPDATE_CURRENCY,
    },
    {
        name: "DELETE_CURRENCY",
        value: UserRights.DELETE_CURRENCY,
    },
    // Stores
    {
        name: "READ_STORES",
        value: UserRights.READ_STORES,
    },
    {
        name: "READ_STORE",
        value: UserRights.READ_STORE,
    },
    {
        name: "CREATE_STORE",
        value: UserRights.CREATE_STORE,
    },
    {
        name: "UPDATE_STORE",
        value: UserRights.UPDATE_STORE,
    },
    {
        name: "DELETE_STORE",
        value: UserRights.DELETE_STORE,
    },
    // Terminals
    {
        name: "READ_TERMINALS",
        value: UserRights.READ_TERMINALS,
    },
    {
        name: "READ_TERMINAL",
        value: UserRights.READ_TERMINAL,
    },
    {
        name: "CREATE_TERMINAL",
        value: UserRights.CREATE_TERMINAL,
    },
    {
        name: "UPDATE_TERMINAL",
        value: UserRights.UPDATE_TERMINAL,
    },
    {
        name: "DELETE_TERMINAL",
        value: UserRights.DELETE_TERMINAL,
    },
    // OrderTypes
    {
        name: "READ_ORDER_TYPES",
        value: UserRights.READ_ORDER_TYPES,
    },
    {
        name: "READ_ORDER_TYPE",
        value: UserRights.READ_ORDER_TYPE,
    },
    {
        name: "CREATE_ORDER_TYPE",
        value: UserRights.CREATE_ORDER_TYPE,
    },
    {
        name: "UPDATE_ORDER_TYPE",
        value: UserRights.UPDATE_ORDER_TYPE,
    },
    {
        name: "DELETE_ORDER_TYPE",
        value: UserRights.DELETE_ORDER_TYPE,
    },
    // Checkue
    {
        name: "READ_CHECKUES",
        value: UserRights.READ_CHECKUES,
    },
    {
        name: "READ_CHECKUE",
        value: UserRights.READ_CHECKUE,
    },
    {
        name: "CREATE_CHECKUE",
        value: UserRights.CREATE_CHECKUE,
    },
    {
        name: "UPDATE_CHECKUE",
        value: UserRights.UPDATE_CHECKUE,
    },
    {
        name: "DELETE_CHECKUE",
        value: UserRights.DELETE_CHECKUE,
    },
    // Themes
    {
        name: "READ_THEMES",
        value: UserRights.READ_THEMES,
    },
    {
        name: "READ_THEME",
        value: UserRights.READ_THEME,
    },
    {
        name: "CREATE_THEME",
        value: UserRights.CREATE_THEME,
    },
    {
        name: "UPDATE_THEME",
        value: UserRights.UPDATE_THEME,
    },
    {
        name: "DELETE_THEME",
        value: UserRights.DELETE_THEME,
    },
    // Menu
    {
        name: "READ_MENU",
        value: UserRights.READ_MENU,
    },
    {
        name: "CREATE_MENU_NODE",
        value: UserRights.CREATE_MENU_NODE,
    },
    {
        name: "UPDATE_MENU_NODE",
        value: UserRights.UPDATE_MENU_NODE,
    },
    {
        name: "DELETE_MENU_NODE",
        value: UserRights.DELETE_MENU_NODE,
    },
    // Ads
    {
        name: "READ_ADS",
        value: UserRights.READ_ADS,
    },
    {
        name: "READ_AD",
        value: UserRights.READ_AD,
    },
    {
        name: "CREATE_AD",
        value: UserRights.CREATE_AD,
    },
    {
        name: "UPDATE_AD",
        value: UserRights.UPDATE_AD,
    },
    {
        name: "DELETE_AD",
        value: UserRights.DELETE_AD,
    },
    // Business period
    {
        name: "READ_BUSINESS_PERIODS",
        value: UserRights.READ_BUSINESS_PERIODS,
    },
    {
        name: "READ_BUSINESS_PERIOD",
        value: UserRights.READ_BUSINESS_PERIOD,
    },
    {
        name: "CREATE_BUSINESS_PERIOD",
        value: UserRights.CREATE_BUSINESS_PERIOD,
    },
    {
        name: "UPDATE_BUSINESS_PERIOD",
        value: UserRights.UPDATE_BUSINESS_PERIOD,
    },
    {
        name: "DELETE_BUSINESS_PERIOD",
        value: UserRights.DELETE_BUSINESS_PERIOD,
    },
    // Applications
    {
        name: "READ_APPLICATIONS",
        value: UserRights.READ_APPLICATIONS,
    },
    {
        name: "READ_APPLICATION",
        value: UserRights.READ_APPLICATION,
    },
    {
        name: "CREATE_APPLICATION",
        value: UserRights.CREATE_APPLICATION,
    },
    {
        name: "UPDATE_APPLICATION",
        value: UserRights.UPDATE_APPLICATION,
    },
    {
        name: "DELETE_APPLICATION",
        value: UserRights.DELETE_APPLICATION,
    },
    // Integrations
    {
        name: "READ_INTEGRATIONS",
        value: UserRights.READ_INTEGRATIONS,
    },
    {
        name: "READ_INTEGRATION",
        value: UserRights.READ_INTEGRATION,
    },
    {
        name: "CREATE_INTEGRATION",
        value: UserRights.CREATE_INTEGRATION,
    },
    {
        name: "UPDATE_INTEGRATION",
        value: UserRights.UPDATE_INTEGRATION,
    },
    {
        name: "DELETE_INTEGRATION",
        value: UserRights.DELETE_INTEGRATION,
    },
    // Tarifs
    {
        name: "READ_TARIFS",
        value: UserRights.READ_TARIFS,
    },
    {
        name: "READ_TARIF",
        value: UserRights.READ_TARIF,
    },
    {
        name: "CREATE_TARIF",
        value: UserRights.CREATE_TARIF,
    },
    {
        name: "UPDATE_TARIF",
        value: UserRights.UPDATE_TARIF,
    },
    {
        name: "DELETE_TARIF",
        value: UserRights.DELETE_TARIF,
    },
    {
        name: "READ_ACCOUNTS",
        value: UserRights.READ_ACCOUNTS,
    },
    {
        name: "READ_ACCOUNT",
        value: UserRights.READ_ACCOUNT,
    },
    {
        name: "CREATE_ACCOUNT",
        value: UserRights.CREATE_ACCOUNT,
    },
    {
        name: "UPDATE_ACCOUNT",
        value: UserRights.UPDATE_ACCOUNT,
    },
    {
        name: "DELETE_ACCOUNT",
        value: UserRights.DELETE_ACCOUNT,
    },
    {
        name: "READ_ACCOUNT_ROLES",
        value: UserRights.READ_ACCOUNT_ROLES,
    },
    {
        name: "READ_ACCOUNT_ROLE",
        value: UserRights.READ_ACCOUNT_ROLE,
    },
    {
        name: "CREATE_ACCOUNT_ROLE",
        value: UserRights.CREATE_ACCOUNT_ROLE,
    },
    {
        name: "UPDATE_ACCOUNT_ROLE",
        value: UserRights.UPDATE_ACCOUNT_ROLE,
    },
    {
        name: "DELETE_ACCOUNT_ROLE",
        value: UserRights.DELETE_ACCOUNT_ROLE,
    },
    {
        name: "UPDATE_ACCOUNT_ROLE_RIGHTS",
        value: UserRights.UPDATE_ACCOUNT_ROLE_RIGHTS,
    },
    {
        name: "READ_DASHBOARD",
        value: UserRights.READ_DASHBOARD,
    },
];