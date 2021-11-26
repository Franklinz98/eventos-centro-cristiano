import CredentialsService from "@/data/services/credentials-service";

export default abstract class CredentialsManager {
  private static readonly service = new CredentialsService();

  static async checkInAttendee(email: string): Promise<void> {
    await this.service.checkInAttendee(email);
  }
}
