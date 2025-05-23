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

export interface topicPreview {
  name: string;
  time: number;   //timestamp
}

export interface IUser extends SignUpResponseData {
  balance: number;
  price_plan: string;
  topics: topicPreview[];
}