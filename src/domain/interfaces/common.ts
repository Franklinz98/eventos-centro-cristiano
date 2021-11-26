// Custom Types

export type FieldType =
  | "text"
  | "number"
  | "email"
  | "select"
  | "password"
  | "multiline";

export enum ScreenType {
  largeDesktop = 1,
  smallDesktop,
  tablet,
  mobile,
}

export interface NavState {
  opened: boolean;
  device: ScreenType;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface CampusData {
  name: string;
  ministers: Array<string>;
  address: string;
  city: string;
  phone: string;
  website: string;
  lat: number;
  lng: number;
}

export interface CardInterface {
  title: string;
  content: string;
  imageUrl: string;
}

export enum SelectionState {
  TooBig = 1,
  NotValid,
  Image,
}

export interface SelectionValue {
  file: File | undefined;
  url: string;
}

export interface ChatMessage {
  displayName: string;
  message: string;
}
