export class Address {
  address: string;
  city: string;
  country: string;
  state: string;
  zipCode: number;
  
  constructor(
    address: string,
    city: string,
    country: string,
    state: string,
    zipCode: number
  ) {
    this.address = address;
    this.city = city;
    this.country = country;
    this.state = state;
    this.zipCode = zipCode;
  }
}
