import axios, { AxiosError, AxiosRequestConfig } from "axios";
import FirebaseAuth from "./firebase-auth";

export default class CredentialsService {
  // private static readonly host = "http://192.168.1.15:3005";
  // private static readonly host = "https://jovenes-cc-backend.herokuapp.com";
  private static readonly host = "https://eventos-cc-backend.herokuapp.com";

  // Attendee: Exists on other event
  // true: Doesn't exists, continue.
  // false: Already registered on this event.
  async checkInAttendee(email: string): Promise<void> {
    const token = (await FirebaseAuth.currentUser?.getIdToken(true)) ?? "";
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    } as AxiosRequestConfig;
    const data = {
      email,
      timestamp: Date.now(),
    };
    try {
      await axios.post(
        `${CredentialsService.host}/credentials/check-in`,
        data,
        config
      );
    } catch (error) {
      const axiosError = error as AxiosError;
      throw axiosError;
    }
  }

  async checkOutAttendee(email: string): Promise<void> {
    const token = (await FirebaseAuth.currentUser?.getIdToken(true)) ?? "";
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    } as AxiosRequestConfig;
    const data = {
      email,
    };
    try {
      await axios.post(
        `${CredentialsService.host}/credentials/check-out`,
        data,
        config
      );
    } catch (error) {
      const axiosError = error as AxiosError;
      throw axiosError;
    }
  }

  async validatePass(email: string): Promise<boolean> {
    const token = (await FirebaseAuth.currentUser?.getIdToken(true)) ?? "";
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    } as AxiosRequestConfig;
    const data = {
      email,
      timestamp: Date.now(),
    };
    try {
      const response = await axios.post(
        `${CredentialsService.host}/credentials/validate-pass`,
        data,
        config
      );
      return response.data.result;
    } catch (error) {
      const axiosError = error as AxiosError;
      throw axiosError;
    }
  }

  async authorizedDays(email: string): Promise<Array<string>> {
    const token = (await FirebaseAuth.currentUser?.getIdToken(true)) ?? "";
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    } as AxiosRequestConfig;
    const data = {
      email,
    };
    try {
      const response = await axios.post(
        `${CredentialsService.host}/credentials/auth-days`,
        data,
        config
      );
      return response.data.result;
    } catch (error) {
      const axiosError = error as AxiosError;
      throw axiosError;
    }
  }
}
