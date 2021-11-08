import { LocalizationService } from "@app/services/localization/localization.service";

export const localizeError = (message: string, localization: LocalizationService): string => {
    if (!message || message.indexOf("Token is empty.") === 0) {
        return "Вы не аторизовались.";
    } else if (message.indexOf("jwt expired") === 0) {
        return "Время сессии истекло.";
    } else if (message.indexOf("token paiload is fail.") === 0) {
        return "Что-то пошло не так, повторите попытку.";
    } else if (message.indexOf("License method not allowed") === 0) {
        return "Метод не доступен.";
    } else if (message.indexOf("Gateway Timeout") > - 1) {
        return "Сервер не отвечает. Попробуйте повторить запроз позже.";
    }

    return "";
}