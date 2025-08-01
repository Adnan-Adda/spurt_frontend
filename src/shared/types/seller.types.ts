export interface Seller{
    firstName: string,
    lastName: string,
    email: string;
    password: string;
    mobileNumber: number;
    status: number;
    customerGroupId: number;
    gender: string;
    avatar: string;
    avatarPath: string;
    dob: string;
    address: string;
    city: string;
    // countryId: number;
}

export interface SellerLogin {
    emailId: string;
    password: string;
}

export interface NewSeller{
    firstName: string,
    lastName: string,
    email: string;
    password: string;
    mobileNumber: number;
    gender: string;
    dob: string;
    city: string;
    countryId: number;
}

export interface UpdateSeller extends NewSeller{
    customerId: number;
}
