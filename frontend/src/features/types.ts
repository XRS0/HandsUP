// export interface JwtPayload {
//   sub: string; // Идентификатор пользователя (обычно строка) 
//   iat?: number; // Время создания токена (опционально) 
//   exp?: number; // Время истечения токена (опционально) 

//   email: string;
//   name: string;
// }

export interface JwtTokens {
  access_token: string;
  refresh_token: string;
}

export interface SignUpResponseData {
  name: string;
  email: string;
  password: string;
}

export interface SignInResponseData {
  email: string;
  password: string;
}