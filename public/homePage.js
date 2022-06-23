'use strict'

const logout = new LogoutButton();

logout.action = function () {
  ApiConnector.logout((response) => {
    if (response.success) {
      location.reload();
    }
  });
};

ApiConnector.current((response) => {
  if (response.success) {
    ProfileWidget.showProfile(response.data);
  }
});

const board = new RatesBoard();

function showBoard(board) {
  ApiConnector.getStocks((response) => {
    if (response.success) {
      board.clearTable();
      board.fillTable(response.data);
    }
  });
};

showBoard(board);
setInterval(showBoard, 60000, board);


const money = new MoneyManager();

money.addMoneyCallback = function (data) {
  ApiConnector.addMoney(data, (response) => {
    if (response.success) {
      ProfileWidget.showProfile(success.data);
      this.setMessage(true, 'Баланс пополнен успешно');
    } else {
      this.setMessage(false, response.error);
    }
  });
};

money.conversionMoneyCallback = function (data) {
  ApiConnector.convertMoney(data, (response) => {
    if (response.success) {
      ProfileWidget.showProfile(success.data);
      this.setMessage(true, 'Конвертация прошла успешно');
    } else {
      this.setMessage(false, response.error);
    }
  });
};

money.sendMoneyCallback = function (data) {
  ApiConnector.transferMoney(data, (response) => {
    if (response.success) {
      ProfileWidget.showProfile(response.data);
      this.setMessage(true, 'Перевод прошел успешно');
    } else {
      this.setMessage(false, response.error);
    }
  });
};

const favorites = new FavoritesWidget();

function showFavorites(response) {
  favorites.clearTable();
  favorites.fillTable(response.data);
  money.updateUsersList(response.data);
}

ApiConnector.getFavorites((response) => {
  if (response.success) {
    showFavorites(response);
  }
});

favorites.addUserCallback = function (data) {
  ApiConnector.addUserToFavorites(data, (response) => {
    if (response.success) {
      showFavorites(response);
      this.setMessage(true, 'Пользователь добавлен в избранное');
    } else {
      this.setMessage(false, response.error);
    }
  });
};

favorites.removeUserCallback = function (data) {
  ApiConnector.removeUserFromFavorites(data, (response) => {
    if (response.success) {
      showFavorites(response);
      this.setMessage(true, 'Пользователь успешно удален');
    } else {
      this.setMessage(false, response.error);
    }
  });
};