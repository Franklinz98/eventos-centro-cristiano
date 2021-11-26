import { SignatureResponse } from "../interfaces/enrollment";
import Attendee from "../models/attendee";
import Enrollment from "../models/enrollments";

export default abstract class EnrollmentInterface {
  abstract checkEnrollment(
    email: string,
    event: string,
    amount: number,
    currency: string
  ): void;

  abstract preEnroll(attendee: Attendee, update: boolean, picture?: File): void;

  abstract sumbitPaymentForm(
    attendee: Attendee,
    enrollment: Enrollment,
    signature: SignatureResponse,
    container: HTMLDivElement
  ): void;
}
