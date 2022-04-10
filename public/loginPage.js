'use strict'

const userForm = new UserForm();
//вход в ЛК
userForm.loginFormCallback = data => {
    ApiConnector.login(data,
        (response) => {
            console.log(data);
            if (response.success) {
                location.reload();
            } else {
                userForm.setLoginErrorMessage(response.error);
            }
        }
    );
}

// регистрация
userForm.registerFormCallback = data => {
    ApiConnector.register(data,
        (response) => {
            console.log(data);
            if (response.success) {
                location.reload();
            } else {
                userForm.setRegisterErrorMessage(response.error);
            }
        }

    )
}