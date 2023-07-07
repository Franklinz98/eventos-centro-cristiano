import { Origin, SignatureResponse } from "@/domain/interfaces/enrollment";
import Attendee from "@/domain/models/attendee";
import Enrollment from "@/domain/models/enrollments";
import EnrollmentInterface from "@/domain/services/enrollment-service";
import axios, { AxiosError, AxiosRequestConfig } from "axios";
import FormData from "form-data";
import path from "path";
import FirebaseAuth from "./firebase-auth";

export default class EnrollmentService implements EnrollmentInterface {
  // private static readonly host = "http://192.168.1.15:3005";
  // private static readonly host = "https://jovenes-cc-backend.herokuapp.com";
  private static readonly host = "https://eventos-cc-backend.herokuapp.com";

  async getSeats(): Promise<number> {
    try {
      const response = await axios.get(
        `${EnrollmentService.host}/credentials/seats`
      );
      return response.data.seats;
    } catch (error) {
      return 0;
    }
  }

  // Attendee: Exists on other event
  // true: Doesn't exists, continue.
  // false: Already registered on this event.
  async checkEnrollment(
    email: string,
    event: string,
    amount: number,
    currency: string,
    origin: string
  ): Promise<
    | {
        signature: SignatureResponse;
        attendee: Attendee;
        available?: undefined;
      }
    | { signature: SignatureResponse; available: boolean; attendee?: undefined }
  > {
    const data = {
      email,
      event,
      amount,
      currency,
      origin,
    };
    try {
      const response = await axios.post(
        `${EnrollmentService.host}/enrollment/check`,
        data
      );
      if (response.data.data) {
        return {
          signature: response.data.signature,
          attendee: new Attendee(response.data.data),
        };
      } else {
        return {
          signature: response.data.signature,
          available: response.data.available,
        };
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      throw axiosError;
    }
  }

  async getEmbed(event: string): Promise<string> {
    try {
      const config = {
        params: {
          event,
        },
      } as AxiosRequestConfig;
      const response = await axios.get(
        `${EnrollmentService.host}/media/get-embed`,
        config
      );
      return response.data.result;
    } catch (error) {
      const axiosError = error as AxiosError;
      throw axiosError;
    }
  }

  async preEnroll(attendee: Attendee, update: boolean): Promise<boolean> {
    try {
      const data = {
        enrollment: JSON.stringify(attendee.enrollment),
        data: JSON.stringify(attendee.json),
        update: update,
      };
      const config = {
        onUploadProgress: (progressEvent) => console.log(progressEvent.loaded),
      } as AxiosRequestConfig;
      const response = await axios.post(
        `${EnrollmentService.host}/enrollment/store`,
        data,
        config
      );
      return response.data.result;
    } catch (error) {
      return false;
    }
  }

  async uploadsPhoto(
    email: string,
    picture: File,
    oldPic?: string
  ): Promise<boolean> {
    try {
      const data = new FormData();
      data.append("email", email);
      if (oldPic) {
        data.append("oldPicture", oldPic);
      }
      data.append(
        "picture",
        picture,
        `${picture.name}${path.extname(picture.name)}`
      );
      const token = (await FirebaseAuth.currentUser?.getIdToken(true)) ?? "";
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": `multipart/form-data; boundary=${data.getBoundary}`,
        },
        onUploadProgress: (progressEvent) => console.log(progressEvent.loaded),
      } as AxiosRequestConfig;
      await axios.post(
        `${EnrollmentService.host}/enrollment/update-photo`,
        data,
        config
      );
      return true;
    } catch (error) {
      return false;
    }
  }

  async staffEnroll(
    attendee: Attendee,
    enrollment: Enrollment,
    origin: Origin
  ): Promise<boolean> {
    try {
      const token = (await FirebaseAuth.currentUser?.getIdToken(true)) ?? "";
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      } as AxiosRequestConfig;
      const data = {
        email: attendee.email,
        currency: enrollment.cost.currency,
        value: enrollment.cost.amount,
        origin: origin,
      };
      await axios.post(
        `${EnrollmentService.host}/enrollment/cash-confirm`,
        data,
        config
      );
      return true;
    } catch (error) {
      return false;
    }
  }

  sumbitPaymentForm(
    attendee: Attendee,
    enrollment: Enrollment,
    signature: SignatureResponse
  ): HTMLFormElement {
    const hiddenForm = document.createElement("form");
    hiddenForm.className += "hidden-form";
    hiddenForm.action = "https://checkout.payulatam.com/ppp-web-gateway-payu";
    hiddenForm.method = "POST";
    hiddenForm.target = "_blank";
    const data: Record<string, number | string | boolean> = {
      merchantId: 536775,
      accountId: 538789,
      referenceCode: signature.reference,
      description: `Inscripción - ${enrollment.eventName} - ${attendee.id}`,
      currency: enrollment.cost.currency,
      amount: enrollment.cost.amount,
      tax: 0,
      taxReturnBase: 0,
      signature: signature.hash,
      test: false,
      buyerFullName: `${attendee.name} ${attendee.lastname}`,
      buyerEmail: attendee.email,
      payerDocument: attendee.id,
      lng: "es",
      confirmationUrl: `${EnrollmentService.host}/enrollment/confirm`,
    };
    for (const key in data) {
      const input = document.createElement("input");
      input.name = key;
      input.value = data[key] + "";
      input.hidden = true;
      hiddenForm.appendChild(input);
    }
    return hiddenForm;
  }
}
