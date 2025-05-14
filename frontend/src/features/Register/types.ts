export interface JwtPayload {
  sub: string; // Идентификатор пользователя (обычно строка) 
  iat?: number; // Время создания токена (опционально) 
  exp?: number; // Время истечения токена (опционально) 

  email: string;
  name: string;
}

export interface RegisterRawData {
  name: string;
  email: string;
  password: string;
}

// interface JwtAuthorization {
//   Authorization: `Bearer ${string}`,
// }

