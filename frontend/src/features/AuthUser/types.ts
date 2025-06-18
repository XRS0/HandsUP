export interface JWT {
  token: string;
}

export interface IUser {
  username: string;
  email: string;
  balance: number;
  price_plan: "Free"| "VIP" | "Premium";
}