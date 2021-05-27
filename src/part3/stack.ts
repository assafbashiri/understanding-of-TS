import { State, bind } from "./state";
import * as R from "ramda";

export type Stack = number[];

export const push = (x: number): State<Stack, undefined> => {
    const state: State<Stack, undefined> = (s: Stack) => {
        const y = R.concat([x], s)
        return [y, undefined]
    }
    return state
}

export const pop: State<Stack, number> = (s: Stack): [Stack, number] => {
    const output = s[0]
    return [s.slice(1), output]
}


export const stackManip = (s: Stack) => {

    const state = bind(pop, (x: number) => bind((s) => [push(x * x)(s)[0], push(x * x)(s)[0]], (s) => bind(pop, (y) => push(x + y))))
    return state(s);

}


