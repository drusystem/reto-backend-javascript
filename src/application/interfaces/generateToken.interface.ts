import { cardInfoI } from "./cardInfo.interface";

export interface generateTokenI extends cardInfoI {
    cvc: string;
}