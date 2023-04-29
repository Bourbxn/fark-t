export interface Order {
  Restaurant: string;
  Category: string;
  CurrentAmount: number;
  LimitAmount: number;
  Status: boolean;
  OrderId: string;
  User: User;
}

export interface User {
  UserId: string;
  Username: string;
  Password: string;
  Telephone: string;
  FarkCoin: number;
}

export interface Fark {
  FarkId: string;
  Menu: string;
  Location: string;
  Status: string;
  User: User;
  Order: Order;
}

export interface OrderProps {
  rest: string;
  cate: string;
  curAmt: number;
  limit: number;
  owner: string;
  orderId: string;
}

export interface FarkProps {
  Menu: string;
  Location: string;
  Status: string;
  User: UserProps;
}

interface UserProps {
  Username: string;
  Telephone: string;
}

export interface HistoryTypes {
  Date: string;
  Role: string;
  CoinSpending: number;
  Restaurant: string;
  Category: string;
  Owner: string;
  Menu: string;
  Location: string;
}

export interface FarkOrderDetails {
  Menu: string;
  Location: string;
  Status: string;
  User: UserProps;
  Order: OrderDetails;
}

interface OrderDetails {
  Restaurant: string;
  Category: string;
}
