export type UserRole = "admin" | "moderator" | "user";

export interface Crypto {
  coin: string;
  wallet: string;
  network: string;
}

export interface Bank {
  cardExpire: string;
  cardNumber: string;
  cardType: string;
  currency: string;
  iban: string;
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Address {
  address: string;
  city: string;
  state: string;
  stateCode: string;
  postalCode: string;
  country: string;
  coordinates: Coordinates;
}

export interface Company {
  department: string;
  name: string;
  title: string;
  address: Address;
}

export interface Hair {
  color: string;
  type: string;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  maidenName: string;
  age: number;
  gender: "male" | "female";
  email: string;
  phone: string;
  username: string;
  birthDate: string;
  image: string;
  bloodGroup: string;
  height: number;
  weight: number;
  eyeColor: string;

  hair: Hair;

  address: Address;

  university: string;

  company: Company;

  bank: Bank;

  crypto: Crypto;

  role: UserRole;
}

export interface UsersResponse {
  users: User[];
  total: number;
  skip: number;
  limit: number;
}
