export const userErr = {
  BadRequestError: 'Переданы некорректные данные пользователя',
  ValidationError: 'Ошибка валидации при создании пользователя',
  NotFoundError: 'Запрашиваемый пользователь не найден',
  ConflictError: ' уже зарегистрирован',
};

export const contactReq = {
  SuccessOkRequest: 'Удаление контакта прошло успешно',
}

export const contactErr = {
  BadRequestError: 'Переданы некорректные данные контакта',
  NotFoundError: 'Запрашиваемых контактов не найдено',
  UpdateError: 'Вы не можете редактировать чужие контакты',
  DeleteError: 'Вы не можете удалять чужие контакты',
};

export const userValidErr = {
  urlErrEmail: 'Неверная почта',
  errEmailRequired: 'Email обязателен для заполнения',
  errEmail: 'Неверный формат почты',
  errPassRequired: 'Пароль обязателен для заполнения',
  errPass: 'Пароль должен быть не менее 8 символов',
};

export const contactValidErr = {
  errNameRequired: 'Имя обязательно для заполнения',
  errNameMin: 'Имя должно быть  не менее 2 символов',
  errNameMax: 'Имя должно быть не более 30 символов',
  errPhoneRequired: 'Телефон обязателен для заполнения',
  errPhoneMin: 'Телефон должен быть  не менее 6 символов',
  errPhoneMax: 'Телефон должен быть не более 24 символов',
  errEmailRequired: 'Email обязателен для заполнения',
  errEmail: 'Неверный формат почты',
};


export const authErr = {
  UnauthorizedError: 'Ошибка аутентификации',
  AuthRequired: 'Необходима авторизация',
  userUnauthError: 'Неправильные почта или пароль',
};

export const serverErr = {
  BadRequestError: 'Переданы некорректные данные',
  ValidationError: 'Ошибка валидации',
  ConflictError: 'конфликт запроса на сервер',
  NotFoundError: 'Запрашиваемый ресурс не найден',
  InternalServerError: 'Ошибка сервера. Ошибка по-умолчанию',
  ServerError: 'На сервере произошла ошибка',
};
