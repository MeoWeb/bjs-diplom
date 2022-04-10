//Выход из личного кабинета

const logoutButton = new LogoutButton();
logoutButton.action = () => ApiConnector.logout((success) => {
    if (success) { location.reload() }
});

//Получение информации о пользователе
ApiConnector.current((responseBody) => {
    if (responseBody.success) {
        ProfileWidget.showProfile(responseBody.data);
    }
});

//Получение текущих курсов валюты
const ratesBoard = new RatesBoard();
let getStocks = function() {
    ApiConnector.getStocks((responseBody) => {
        if (responseBody.success) {
            ratesBoard.clearTable();
            ratesBoard.fillTable(responseBody.data);
        }
    });
};

getStocks();
setInterval(getStocks, 60000);

//Операции с деньгами
const moneyManager = new MoneyManager();

//пополнение баланса
moneyManager.addMoneyCallback = data => {
    ApiConnector.addMoney(data,
        (responseBody) => {
            console.log(data);
            console.log(responseBody);
            if (responseBody.success) {
                ProfileWidget.showProfile(responseBody.data);
            } else {
                moneyManager.setMessage(responseBody.success, responseBody.error);
            };
        });
}

//конвертирование валюты
moneyManager.conversionMoneyCallback = data => {
    ApiConnector.convertMoney(data,
        (responseBody) => {
            console.log(data);
            console.log(responseBody);
            if (responseBody.success) {
                ProfileWidget.showProfile(responseBody.data);
            } else {
                moneyManager.setMessage(responseBody.success, responseBody.error);
            };
        }
    )

}

//перевод валюты
moneyManager.sendMoneyCallback = data => {
    ApiConnector.transferMoney(data,
        (responseBody) => {
            console.log(data);
            console.log(responseBody);
            if (responseBody.success) {
                ProfileWidget.showProfile(responseBody.data);
            } else {
                moneyManager.setMessage(responseBody.success, responseBody.error);
            };
        }
    )

}

//Работа с избранным
const favoritesWidget = new FavoritesWidget();
ApiConnector.getFavorites((responseBody) => {
    if (responseBody.success) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(responseBody.data);
        moneyManager.updateUsersList(responseBody.data);
    }
});
favoritesWidget.addUserCallback = data => {
    ApiConnector.addUserToFavorites(data,
        (responseBody) => {
            if (responseBody.success) {
                favoritesWidget.clearTable();
                favoritesWidget.fillTable(responseBody.data);
                moneyManager.updateUsersList(responseBody.data);
            }
        }
    )
}
favoritesWidget.removeUserCallback = data => {
    ApiConnector.removeUserFromFavorites(data,
        (responseBody) => {
            if (responseBody.success) {
                favoritesWidget.clearTable();
                favoritesWidget.fillTable(responseBody.data);
                moneyManager.updateUsersList(responseBody.data);
            }
        }
    )
}