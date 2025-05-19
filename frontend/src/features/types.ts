export interface JwtPayload {
  sub: string; // Идентификатор пользователя (обычно строка) 
  iat?: number; // Время создания токена (опционально) 
  exp?: number; // Время истечения токена (опционально) 

  email: string;
  name: string;
}

export interface JwtPayloadWithToken extends JwtPayload {
  jwt: string;
}

export interface RegisterResponseData {
  name: string;
  email: string;
  password: string;
}

export interface LoginResponseData {
  email: string;
  password: string;
}