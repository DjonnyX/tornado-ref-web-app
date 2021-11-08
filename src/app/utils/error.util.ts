import { LocalizationService } from "@app/services/localization/localization.service";

export const localizeError = (message: string, localization: LocalizationService): string => {
    console.log(message, message.indexOf("504 Gateway Timeout"))
    let result = "";
    if (!message || message.indexOf("Token is empty.") === 0) {
        result = "Вы не аторизовались.";
    } else if (message.indexOf("jwt expired") === 0) {
        result = "Время сессии истекло.";
    } else if (message.indexOf("token paiload is fail.") === 0) {
        result = "Что-то пошло не так, повторите попытку.";
    } else if (message.indexOf("License method not allowed") === 0) {
        result = "Метод не доступен.";
    } else if (message.indexOf("Gateway Timeout") > - 1) {
        result = "Сервер не отвечает. Попробуйте повторить запроз позже.";
    } else {
        result = message;
    }

    return result;
}