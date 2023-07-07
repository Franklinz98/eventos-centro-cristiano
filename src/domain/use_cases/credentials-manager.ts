import CredentialsService from "@/data/services/credentials-service";

export default abstract class CredentialsManager {
  private static readonly service = new CredentialsService();

  static async checkInAttendee(email: string): Promise<void> {
    await this.service.checkInAttendee(email);
  }

  static async checkOutAttendee(email: string): Promise<void> {
    await this.service.checkOutAttendee(email);
  }

  static async validatePass(email: string): Promise<boolean> {
    return await this.service.validatePass(email);
  }

  static async authDays(email: string): Promise<Array<string>> {
    return await this.service.authorizedDays(email);
  }
}
