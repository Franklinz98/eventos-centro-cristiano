import axios, { AxiosError } from "axios";

export default class CredentialsService {
  // private static readonly host = "http://192.168.1.2:3005";
  private static readonly host = "https://jovenes-cc-backend.herokuapp.com";

  // Attendee: Exists on other event
  // true: Doesn't exists, continue.
  // false: Already registered on this event.
  async checkInAttendee(email: string): Promise<void> {
    const data = {
      email,
      timestamp: Date.now(),
    };
    try {
      const response = await axios.post(
        `${CredentialsService.host}/credentials/check-in`,
        data
      );
      console.log(response.data);
    } catch (error) {
      const axiosError = error as AxiosError;
      throw axiosError;
    }
  }

  async validatePass(email: string): Promise<boolean> {
    const data = {
      email,
      timestamp: Date.now(),
    };
    try {
      const response = await axios.post(
        `${CredentialsService.host}/credentials/validate-pass`,
        data
      );
      console.log(response.data);
      return response.data.result;
    } catch (error) {
      const axiosError = error as AxiosError;
      throw axiosError;
    }
  }
}
