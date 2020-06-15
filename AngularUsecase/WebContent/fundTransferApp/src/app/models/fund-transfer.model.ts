/**
 * @description This is Fund Transfer Model, this model class response type is Transaction History
 */
export interface FundTransfer {
    id:number;
    frmaccount:number;
    toaccount:number;
    amount:number;
    desc:string;
    transdate:string;


}
