import EnrollmentService from "@/data/services/enrollment-service";
import {
  CriticalData,
  DetailsData,
  EnrollmentMode,
  EventType,
  Origin,
  SignatureResponse,
} from "@/domain/interfaces/enrollment";
import Attendee from "../models/attendee";
import Enrollment from "../models/enrollments";
import PopUpMessage, { NotificationType } from "../models/popup";

export default abstract class EnrollmentManager {
  private static readonly service = new EnrollmentService();

  static get defaultCriticalData(): CriticalData {
    return {
      mode: "F2F",
      country: "CO",
      idType: "CC",
      lvlup: "EC",
      origin: "online",
    } as CriticalData;
  }

  static get defaultStaffCriticalData(): CriticalData {
    return {
      mode: "F2F",
      country: "CO",
      idType: "CC",
      lvlup: "EC",
      origin: "efectivo",
    } as CriticalData;
  }

  static get defaultDetailsData(): DetailsData {
    return {
      profilePic: "",
    } as DetailsData;
  }

  static getEnrollmentInstance(
    event: EventType,
    mode: EnrollmentMode,
    country: string
  ): Enrollment {
    return new Enrollment(event, mode, country);
  }

  // DetailsData: Exists on other event
  // true: Doesn't exists, continue.
  // false: Already registered on this event.
  static async checkCriticalData(
    email: string,
    enrollment: Enrollment,
    origin: string
  ): Promise<
    | { signature: SignatureResponse; data: DetailsData; available?: undefined }
    | { signature: SignatureResponse; available: boolean; data?: undefined }
  > {
    const cost = enrollment.cost;
    const result = await EnrollmentManager.service.checkEnrollment(
      email,
      enrollment.event,
      cost.amount,
      cost.currency,
      origin
    );
    if (result.attendee) {
      return {
        signature: result.signature,
        data: {
          profilePic: result.attendee.profilePic,
          name: result.attendee.name,
          lastname: result.attendee.lastname,
          address: result.attendee.address,
          city: result.attendee.city,
          whatsapp: result.attendee.whatsapp,
        } as DetailsData,
      };
    }
    return {
      signature: result.signature,
      available: result.available,
    };
  }

  static generateAttendee(
    event: EventType,
    criticalData: CriticalData,
    detailsData: DetailsData
  ): Attendee {
    const attendee = new Attendee(
      {
        profilePic: detailsData.profilePic,
        name: detailsData.name,
        lastname: detailsData.lastname,
        idType: criticalData.idType,
        id: criticalData.id,
        email: criticalData.email,
        address: detailsData.address,
        city: detailsData.city,
        country: criticalData.country,
        whatsapp: detailsData.whatsapp,
        lvlup: criticalData.lvlup,
        group: criticalData.group,
      },
      {
        event: event,
        mode: criticalData.mode,
      }
    );
    return attendee;
  }

  static async getSeats(): Promise<number> {
    const result = await EnrollmentManager.service.getSeats();
    if (result === 0) {
      const popup = new PopUpMessage({
        title: "No hay cupos",
        message: "Lo sentimos no hay más cupos en modalidad presencial",
        type: NotificationType.Error,
      });
      popup.show();
    }
    return result;
  }

  static async preEnroll(
    attendee: Attendee,
    update: boolean
  ): Promise<boolean> {
    const result = await EnrollmentManager.service.preEnroll(attendee, update);
    return result;
  }

  static async generatePayUForm(
    attendee: Attendee,
    enrollment: Enrollment,
    signature: SignatureResponse,
    container: HTMLDivElement
  ): Promise<void> {
    const form = EnrollmentManager.service.sumbitPaymentForm(
      attendee,
      enrollment,
      signature
    );
    container.appendChild(form);
    form.submit();
  }

  static async staffEnroll(
    attendee: Attendee,
    enrollment: Enrollment,
    origin: Origin
  ): Promise<boolean> {
    const result = await EnrollmentManager.service.staffEnroll(
      attendee,
      enrollment,
      origin
    );
    return result;
  }

  static async uploadPhoto(
    email: string,
    file: File,
    oldPic?: string
  ): Promise<boolean> {
    const result = await EnrollmentManager.service.uploadsPhoto(
      email,
      file,
      oldPic
    );
    return result;
  }

  static preFetchCredential(credentialId: string): void {
    const url = `https://storage.googleapis.com/eventos-5d8d7.appspot.com/credentials/${credentialId}.png`;
    const img = new Image();
    img.src = url;
  }

  static alreadyRegisteredError(event: string): void {
    const popup = new PopUpMessage({
      title: "Ya registrado",
      message: `Este correo electrónico  ya se encuentra registrado en ${event}`,
      type: NotificationType.Error,
    });
    popup.show();
  }

  static somethingWentWrong(): void {
    const popup = new PopUpMessage({
      title: "Hubo un error",
      message: "Hubo un error procesando tus datos intentalo de nuevo.",
      type: NotificationType.Error,
    });
    popup.show();
  }

  static async fetchEmbed(event: string): Promise<string> {
    return await EnrollmentManager.service.getEmbed(event);
  }
}
