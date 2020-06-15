/**
 * @description This is bank Customer Model
 */
export interface Customer {
    id: number;
    custname: string;
    email: string;
    password: string;
    mobileNumber: string;
    address: string;
    accountNo:number;
    balance:number;
    benificiary:[];

}
