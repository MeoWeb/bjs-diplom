//выход
const logoutButton = new LogoutButton();
logoutButton.action = () => ApiConnector.logout((success) => {
    if (success) { location.reload() }
});

//