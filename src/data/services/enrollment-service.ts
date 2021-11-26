import { SignatureResponse } from "@/domain/interfaces/enrollment";
import Attendee from "@/domain/models/attendee";
import Enrollment from "@/domain/models/enrollments";
import EnrollmentInterface from "@/domain/services/enrollment-service";
import axios, { AxiosError, AxiosRequestConfig } from "axios";
import FormData from "form-data";
import path from "path";

export default class EnrollmentService implements EnrollmentInterface {
  // private static readonly host = "http://192.168.1.2:3005";
  private static readonly host = "https://jovenes-cc-backend.herokuapp.com";

  // Attendee: Exists on other event
  // true: Doesn't exists, continue.
  // false: Already registered on this event.
  async checkEnrollment(
    email: string,
    event: string,
    amount: number,
    currency: string
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
    };
    try {
      const response = await axios.post(
        `${EnrollmentService.host}/enrollment/check`,
        data
      );
      console.log(response.data);
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
      console.log(response.data.result);
      return response.data.result;
    } catch (error) {
      const axiosError = error as AxiosError;
      throw axiosError;
    }
  }

  async preEnroll(
    attendee: Attendee,
    update: boolean,
    picture?: File
  ): Promise<boolean> {
    try {
      const data = new FormData();
      data.append("enrollment", JSON.stringify(attendee.enrollment));
      data.append("data", JSON.stringify(attendee.json));
      data.append("update", update);
      if (picture) {
        data.append(
          "picture",
          picture,
          `${attendee.name}${path.extname(picture.name)}`
        );
      }
      const config = {
        headers: {
          "Content-Type": `multipart/form-data; boundary=${data.getBoundary}`,
        },
        onUploadProgress: (progressEvent) => console.log(progressEvent.loaded),
      } as AxiosRequestConfig;
      const response = await axios.post(
        `${EnrollmentService.host}/enrollment/store`,
        data,
        config
      );
      console.log(response.data.result);
      return response.data.result;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async staffEnroll(
    attendee: Attendee,
    enrollment: Enrollment
  ): Promise<boolean> {
    try {
      const data = {
        email: attendee.email,
        currency: enrollment.cost.currency,
        value: enrollment.cost.amount,
      };
      const response = await axios.post(
        `${EnrollmentService.host}/enrollment/cash-confirm`,
        data
      );
      console.log(response.data);
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
    hiddenForm.action =
      "https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/";
    hiddenForm.method = "POST";
    hiddenForm.target = "_blank";
    const data: Record<string, number | string | boolean> = {
      merchantId: 508029,
      accountId: 512321,
      referenceCode: signature.reference,
      description: `Inscripción - ${enrollment.eventName} - ${attendee.id}`,
      currency: enrollment.cost.currency,
      amount: enrollment.cost.amount,
      tax: 0,
      taxReturnBase: 0,
      signature: signature.hash,
      test: true,
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
    console.log(hiddenForm);
    return hiddenForm;
  }
}
