export interface IUser {
  uid: string;
  name: string;
  email: string;
}

export interface UserRawData extends IUser {
  jwt: string;
  loading: boolean;
  error: Error | null;
}

