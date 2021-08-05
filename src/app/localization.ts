const LOCALIZATION = {
    "ru": {
        "common_ctrl_required": "обязательное",
        // auth error
        "auth_error_title": "Ошибка",
        "auth_error_return-to-signin": "Вернуться к авторизации",
        // sign in
        "auth_signin-title": "Вход",
        "auth_signin_signup-link": "Зарегистрироваться",
        "auth_signin_email-field-label": "Email",
        "auth_signin_email-field-pattern-validation-message": "Пожалуйста введите корректный email адрес",
        "auth_signin_password-field-label": "Пароль",
        "auth_signin_password-field-pattern-validation-message": "Пароль должен содержать латинские буквы, цифры и заглавные буквы.",
        "auth_signin_cant-enter": "Не получается войти?",
        "auth_signin_enter": "Войти",
        // sign up
        "auth_signup-title": "Регистрация",
        "auth_signup-exists-account": "Уже зарегистрированы?",
        "auth_signup-signin": "Войти",
        "auth_signup-integration-field-label": "Интеграция",
        "auth_signup-first-name-field-label": "Имя",
        "auth_signup-first-name-field-validation-pattern-message": "Имя должно состоять более чем из 1 буквы",
        "auth_signup-last-name-field-label": "Фамилия",
        "auth_signup-last-name-field-validation-pattern-message": "Фамилия должна состоять более чем из 1 буквы",
        "auth_signup-email-field-label": "Email",
        "auth_signup-email-field-validation-pattern-message": "Пожалуйста, введите действительный адрес электронной почты",
        "auth_signup-password-field-label": "Пароль",
        "auth_signup-password-field-validation-pattern-message": "Пароль должен содержать латинские буквы, цифры и заглавные буквы.",
        "auth_signup-confirm-password-field-label": "Повторить пароль",
        "auth_signup-confirm-password-field-validation-message": "Пароли не совпадают",
        "auth_signup-captcha-field-label": "Введите текст с картинки",
        "auth_signup-registration": "Зарегистрироваться",
        "auth_signup-agree-with": "Я согласен с",
        "auth_signup-term-of-use": "Условиями использования",
        // term of use
        "auth_term-of-use_title": "Условия пользовательского соглашения",
        "auth_term-of-use_text": `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
        standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make
        a
        type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting,
        remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing
        Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions
        of
        Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
        industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled
        it
        to make a type specimen book. It has survived not only five centuries, but also the leap into electronic
        typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset
        sheets
        containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker
        including
        versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
        has
        been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into
        electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of
        Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus
        PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer
        took
        a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but
        also
        the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the
        release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software
        like
        Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and
        typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer
        took
        a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but
        also
        the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the
        release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software
        like
        Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and
        typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer
        took
        a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but
        also
        the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the
        release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software
        like
        Aldus PageMaker including versions of Lorem Ipsum.`,
        // auth forgot password
        "auth_forgot-password_title": "Забыли пароль?",
        "auth_forgot-password_message": `Не волнуйтесь, мы вас поддержим! Просто введите свой адрес электронной почты, и мы пришлем
        вам ссылку, по которой вы сможете сбросить пароль.`,
        "auth_forgot-password_back-to-signin": "Войти",
        "auth_forgot-password_email-field-label": "Email",
        "auth_forgot-password_email-field-pattern-validation-message": "Пожалуйста, введите действительный адрес электронной почты",
        "auth_forgot-password_captcha": "Введите текст с картинки",
        "auth_forgot-password_button-send": "Отправить",
        // auth forgot password result
        "auth_forgot-password-result_title": "Проверьте Ваш email",
        "auth_forgot-password-result_message": "Если учетная запись Tornado существует, Вы получите электронное письмо со ссылкой для сброса пароля.",
        "auth_forgot-password-result_back-to-signin": "Вернуться к авторизации",
        // auth reset password
        "auth_reset-password_title": "Сбросить пароль",
        "auth_reset-password_message": "Введите новый пароль, чтобы продолжить. Вы выйдете из всех ваших активных сессий.",
        "auth_reset-password_new-password": "Новый пароль",
        "auth_reset-password_new-password-validation-pattern-message": "Пароль должен содержать латинские буквы, цифры и заглавные буквы.",
        "auth_reset-password_button-reset": "Сбросить пароль",
        // auth reset password result
        "auth_reset-password-result_title": "Ваш пароль был сброшен!",
        "auth_reset-password-result_message": "Войдите снова с новым паролем.",
        "auth_reset-password-result_return-to-signin": "Вернуться, чтобы войти",
    },
    "eng": {
        "common_ctrl_required": "required",
        // auth error
        "auth_error_title": "Error",
        "auth_error_return-to-signin": "Return to sign in",
        // sign in
        "auth_signin-title": "Sign in",
        "auth_signin_signup-link": "Sign up",
        "auth_signin_email-field-label": "Email",
        "auth_signin_email-field-pattern-validation-message": "Please enter a valid email address",
        "auth_signin_password-field-label": "Password",
        "auth_signin_password-field-pattern-validation-message": "The password must contain Latin letters, numbers and capital letters.",
        "auth_signin_cant-enter": "Can't sign in?",
        "auth_signin_enter": "Enter",
        // sign up
        "auth_signup-title": "Sign up",
        "auth_signup-exists-account": "Already Registered?",
        "auth_signup-signin": "Sign in",
        "auth_signup-integration-field-label": "Integration",
        "auth_signup-first-name-field-label": "First name",
        "auth_signup-first-name-field-validation-pattern-message": "The name must be more than 1 letter",
        "auth_signup-last-name-field-label": "Last name",
        "auth_signup-last-name-field-validation-pattern-message": "The last must be more than 1 letter",
        "auth_signup-email-field-label": "Email",
        "auth_signup-email-field-validation-pattern-message": "Please enter a valid email address",
        "auth_signup-password-field-label": "Password",
        "auth_signup-password-field-validation-pattern-message": "The password must contain Latin letters, numbers and capital letters.",
        "auth_signup-confirm-password-field-label": "Confirm password",
        "auth_signup-confirm-password-field-validation-message": "Password mismatch",
        "auth_signup-captcha-field-label": "Enter the text from the picture",
        "auth_signup-registration": "Register",
        "auth_signup-agree-with": "I agree with",
        "auth_signup-term-of-use": "terms of use",
        // term of use
        "auth_term-of-use_title": "Term of use",
        "auth_term-of-use_text": `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
        standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make
        a
        type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting,
        remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing
        Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions
        of
        Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
        industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled
        it
        to make a type specimen book. It has survived not only five centuries, but also the leap into electronic
        typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset
        sheets
        containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker
        including
        versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
        has
        been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into
        electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of
        Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus
        PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer
        took
        a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but
        also
        the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the
        release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software
        like
        Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and
        typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer
        took
        a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but
        also
        the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the
        release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software
        like
        Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and
        typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer
        took
        a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but
        also
        the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the
        release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software
        like
        Aldus PageMaker including versions of Lorem Ipsum.`,
        // auth forgot password
        "auth_forgot-password_title": "Forgot your password?",
        "auth_forgot-password_message": `Don't worry, we'll support you! Just enter your email address and we will send
        link to you where you can reset your password.`,
        "auth_forgot-password_back-to-signin": "Sign in",
        "auth_forgot-password_email-field-label": "Email",
        "auth_forgot-password_email-field-pattern-validation-message": "Please enter a valid email address",
        "auth_forgot-password_captcha": "Enter the text from the picture",
        "auth_forgot-password_button-send": "Send",
        // auth forgot password result
        "auth_forgot-password-result_title": "Check your email",
        "auth_forgot-password-result_message": "If a Tornado account exists, you will receive an email with a link to reset your password.",
        "auth_forgot-password-result_back-to-signin": "Return to sign in",
        // auth reset password
        "auth_reset-password_title": "Reset the password",
        "auth_reset-password_message": "Enter your new password to continue. You will be logged out of all your active sessions.",
        "auth_reset-password_new-password": "New password",
        "auth_reset-password_new-password-validation-pattern-message": "The password must contain Latin letters, numbers and capital letters.",
        "auth_reset-password_button-reset": "Reset",
        // auth reset password result
        "auth_reset-password-result_title": "Your password has been reset!",
        "auth_reset-password-result_message": "Log in again with a new password.",
        "auth_reset-password-result_return-to-signin": "Return to sign in",
    }
};

export default LOCALIZATION;