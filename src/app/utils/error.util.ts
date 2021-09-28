import { LocalizationService } from "@app/services/localization/localization.service";

export const localizeError = (message: string, localization: LocalizationService): string => {
    let result = "";
    if (!message || message === "Token is empty.") {
        message = "Unathorized.";
    } else if (message === "jwt expired") {
        message = "Время сессии истекло.";
    } else if (message === "License method not allowed") {
        message = "Метод не доступен.";
    } else {
        result = message;
    }

    return result;
}