export interface JWT {
  access_token: string;
}

export interface SignUpResponseData {
  username: string;
  email: string;
  password: string;
}

export interface SignInResponseData {
  email: string;
  password: string;
}