export type Currency = "COP" | "USD";

export type EventType = "R21" | "CE";

export type EnrollmentMode = "F2F" | "DIG" | "NA";

/* CC: Cedula Ciudadaia, CE: Cedula Extranjeria,
TI: Tarjeta de Identidad, PAS: Pasaporte, NIT */
export type Identification = "CC" | "CE" | "TI" | "PAS" | "NIT";

export type Language = "es" | "pt" | "en";

export interface SignatureResponse {
  reference: string;
  hash: string;
}

export interface AuthData {
  id: number;
  email: string;
}

export interface Enrollment {
  event: EventType;
  mode: EnrollmentMode;
}

export interface CriticalData {
  mode: EnrollmentMode;
  country: string;
  idType: Identification;
  id: number;
  email: string;
  lvlup: string;
  group: string;
}

export interface DetailsData {
  profilePic: string;
  picture: File;
  name: string;
  lastname: string;
  address: string;
  city: string;
  whatsapp: string;
}

export interface PayUBody {
  merchantId: number;
  referenceCode: string;
  description: string;
  amount: number;
  tax: number;
  taxReturnBase: number;
  signature: string;
  accountId: number;
  country: string;
  currency: Currency;
  buyerFullName: string;
  buyerDocument: string;
  buyerEmail: string;
  responseUrl: string;
  confirmationUrl: string;
  language: Language;
  test: 0 | 1;
}

export interface EnrollmentData {
  state: string;
  amount: number;
  currency: string;
  type: Enrollment;
  name: string;
  lastname: string;
  idType: string;
  id: number;
  email: string;
  address: string;
  city: string;
  country: string;
  whatsapp: string;
  reference: string;
}
