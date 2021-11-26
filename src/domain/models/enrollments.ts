import { Currency, EnrollmentMode, EventType } from "../interfaces/enrollment";

interface EnrollmentCost {
  amount: number;
  currency: Currency;
}

export default class Enrollment {
  event: EventType;
  mode: EnrollmentMode;
  country: string;

  constructor(event: EventType, mode: EnrollmentMode, country: string) {
    this.event = event;
    this.mode = mode;
    this.country = country;
  }

  get cost(): EnrollmentCost {
    const data = {} as EnrollmentCost;
    data.currency = this.country === "CO" ? "COP" : "USD";
    if (this.event === "R21") {
      // Convention cost
      data.amount = this.country === "CO" ? 60000 : 18;
    } else {
      // Cafe Emprender cost
      data.amount = this.country === "CO" ? 200000 : 50;
    }
    if (this.mode === "DIG" && this.event === "R21") {
      data.amount /= 2;
    }
    return data;
  }

  get eventName(): string {
    return this.event === "R21" ? "Influyentes: La Misión" : "Café Emprender";
  }
}
