import { AttendeeData, CriticalData, Enrollment } from "@/models/enrollment";

export default abstract class EnrollmentManager {
  static defaultAttendeeData(type: Enrollment): AttendeeData {
    return {
      type: type,
      mode: "F2F",
      country: "CO",
    } as AttendeeData;
  }

  static defaultCriticalData(): CriticalData {
    return {
      mode: "F2F",
      country: "CO",
      idType: "CC",
    } as CriticalData;
  }
}
