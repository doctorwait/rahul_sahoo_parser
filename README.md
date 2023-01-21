# Релизовано:

- Верстка отсновной страницы и попапов для логина/регистрации (верстка для планшетов и десктопов);

- Регистрация пользователя: данные формы отправляются на DummyJSON (как будет реализована реистрация на нашем сервере, то просто останется просто поменять адрес)

- Логин пользователя: данные формы отправляются на DummyJSON, откуда потом загружаются данные пользователя (только одного) и jwt токен. Реализован чекбокс "keep sign in" - если отметить его, то в дальнейшем при закрытии вкладки и повторном открытии автгматически происходит аутентификация по сохраненному jwt на DummyJSON и загрузка данных пользователя;

- Выход из аккаунта пользователя;

- Контекст пользователя - отображатся загруженные с DummyJSON данные пользователя;

- При отправке данных форм или загрузки данных пользователя есть анимации загрузки;

- При сабмите формы на главной странице после таймаута в 1 секунду скачивается txt файл с данными введенными в поля формы (функция запроса к API для загрузки файла готова, при готовности API надо будет вписать ее вместо тестовой);

- Валидация форм логина и регистрации;