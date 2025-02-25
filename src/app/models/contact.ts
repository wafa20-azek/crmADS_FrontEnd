import { JobTitle } from './jobTitle';
import { Address } from './address';
import { User } from './user';

export class Contact {
  id: number;
  firstName: string;
  lastName: string;
  contactOwner: User;
  email: string;
  phone: number;
  company: string;
  jobTitle: JobTitle;
  address: Address;
  constructor(
    id: number,
    firstName: string,
    lastName: string,
    contactOwner: User,
    email: string,
    phone: number,
    company: string,
    jobTitle: JobTitle,
    address: Address
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.contactOwner = contactOwner;
    this.email = email;
    this.phone = phone;
    this.company = company;
    this.jobTitle = jobTitle;
    this.address = address;
  }
}
