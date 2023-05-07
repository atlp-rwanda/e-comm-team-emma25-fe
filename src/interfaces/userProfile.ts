export interface ProfileDetails {
    // firstName: string;
    // lastName: string;
    // email: string;
    phoneNumber: string;
    gender: string;
    birthdate: string;
    language: string;
}

export interface BillingAddress {
    streetAddress: string;
    city: string;
    stateOrProvince: string;
    zipOrPostalCode: string;
    country: string;
}

export interface Address {
    streetAddress: string;
    city: string;
    stateOrProvince: string;
    zipOrPostalCode: string;
    country: string;
}

export interface FormValues {
    billingStreetAddress: string;
    billingCity: string;
    billingStateOrProvince: string;
    billingZipOrPostalCode: string;
    billingCountry: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    gender: string;
    birthdate: string;
    language: string;
    streetAddress: string;
    city: string;
    stateOrProvince: string;
    zipOrPostalCode: string;
    country: string;
}