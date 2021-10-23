import { LocalizationService } from "@app/services/localization/localization.service";

export const localizeError = (message: string, localization: LocalizationService): string => {
    let result = "";
    if (!message || message === "Token is empty.") {
        result = "Вы не аторизовались.";
    } else if (message === "jwt expired") {
        result = "Время сессии истекло.";
    } else if (message === "token paiload is fail.") {
        result = "Что-то пошло не так, повторите попытку.";
    } else if (message === "License method not allowed") {
        result = "Метод не доступен.";
    } else {
        result = message;
    }

    return result;
}