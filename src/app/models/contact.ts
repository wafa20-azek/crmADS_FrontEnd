export enum JobTitle{
    ceo='CEO',
    dev='DEV'
}
export interface Address{
    address: string
    city:string
    country: string
    state:string
    zipCode: number
}
export interface Contact{
    id:number
    firstName: string
    lastName: string
    contactOwner: Contact
    email: string
    phone: number
    company:string
    jobTitle: JobTitle
    address:Address
}