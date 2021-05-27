import { Stack } from "./stack";

export type State<S, A> = (initialState: S) => [S, A];
let state: State<number, string>

export const bind = <S, A, B>(state: State<S, A>, f: (x: A) => State<S, B>): State<S, B> => {
    const bindState:State<S,B> = (s: S):[S,B] => {
        const data =state(s)
        const stateB =f(data[1])
        return stateB(data[0])
    }
    return bindState
};
