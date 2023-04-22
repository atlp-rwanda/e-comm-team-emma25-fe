import { ReactNode } from "react";

export interface SellerProfile {
    language: ReactNode;
    city: ReactNode;
    stateOrProvince: ReactNode;
    zipOrPostalCode: ReactNode;
    country: ReactNode;
    birthdate: ReactNode;
    gender: ReactNode;
    lastName: ReactNode;
    firstName: ReactNode;
    name: string;
    email: string;
    phoneNumber: string;
    address: string;
    createdAt: string;
    updatedAt: string;
}
// export interface FormValues {
//     firstName: string;
//     lastName: string;
//     email: string;
//     phoneNumber: string;
//     gender: string;
//     birthdate: string;
//     language: string;
//     streetAddress: string;
//     city: string;
//     stateOrProvince: string;
//     zipOrPostalCode: string;
//     country: string;
//     address?: string; // make address property optional
// }
export interface FormValues  {
    firstName: string;
    lastName?: string;
    email?: string;
    phoneNumber?: string;
    gender?: string;
    birthdate?: string;
    language?: string;
    streetAddress?: string;
    city?: string;
    stateOrProvince?: string;
    zipOrPostalCode?: string;
    country?: string;
    address?: string;
}

