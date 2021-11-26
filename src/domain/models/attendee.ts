import { Enrollment, Identification } from "../interfaces/enrollment";

export default class Attendee {
  profilePic: string;
  enrollment: Enrollment;
  name: string;
  lastname: string;
  idType: Identification;
  id: number;
  email: string;
  address: string;
  city: string;
  country: string;
  whatsapp: string;
  lvlup: string;
  group: string;

  constructor(
    {
      profilePic = "",
      name,
      lastname,
      idType,
      id,
      email,
      address,
      city,
      country,
      whatsapp,
      lvlup,
      group = "",
    }: AttendeeData,
    enrollment = {} as Enrollment
  ) {
    this.profilePic = profilePic;
    this.enrollment = enrollment;
    this.name = name;
    this.lastname = lastname;
    this.idType = idType;
    this.id = id;
    this.email = email;
    this.address = address;
    this.city = city;
    this.country = country;
    this.whatsapp = whatsapp;
    this.lvlup = lvlup;
    this.group = group;
  }

  get json(): AttendeeData {
    return {
      profilePic: this.profilePic,
      name: this.name,
      lastname: this.lastname,
      idType: this.idType,
      id: this.id,
      email: this.email,
      address: this.address,
      city: this.city,
      country: this.country,
      whatsapp: this.whatsapp,
      lvlup: this.lvlup,
      group: this.group,
    };
  }

  static get initialData(): AttendeeData {
    return {
      country: "CO",
    } as AttendeeData;
  }
}

export interface AttendeeData {
  profilePic: string;
  name: string;
  lastname: string;
  idType: Identification;
  id: number;
  email: string;
  address: string;
  city: string;
  country: string;
  whatsapp: string;
  lvlup: string;
  group: string;
}
