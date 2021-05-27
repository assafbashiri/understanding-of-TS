import { Result, makeFailure, makeOk, bind, either, isFailure } from "../lib/result";
import * as R from "ramda";

/* Library code */
const findOrThrow = <T>(pred: (x: T) => boolean, a: T[]): T => {
    for (let i = 0; i < a.length; i++) {
        if (pred(a[i])) return a[i];
    }
    throw "No element found.";
}

export const findResult = <T>(pred: (x: T) => boolean, a: T[]): Result<T> => {
    const arr: T[] = R.filter(pred, a)
    if (arr.length > 0)
        return makeOk(arr[0])
    else
        return makeFailure("no such element exists")
};

/* Client code */
const returnSquaredIfFoundEven_v1 = (a: number[]): number => {
    try {
        const x = findOrThrow(x => x % 2 === 0, a);
        return x * x;
    } catch (e) {
        return -1;
    }
}

export const returnSquaredIfFoundEven_v2 = (a: number[]): Result<number> => {

    const result = findResult(x => x % 2 === 0, a);
    const f = (x: number): Result<number> => {
        return ({ tag: "Ok", value: x * x });
    }
    return bind(result, f)
};

export const returnSquaredIfFoundEven_v3 = (a: number[]): number => {
    const result = findResult(x => x % 2 === 0, a);
    const ifOk = (value:number)=>{return value*value}
    const ifFailure = (message:string)=>{return -1}
    return either(result,ifOk,ifFailure)

};
