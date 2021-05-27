import { Stack } from "./stack";
import { State, bind } from "./state";
import * as R from "ramda";

export type Queue = number[];


export const enqueue = (x: number): State<Queue, number | undefined> => {
    const state: State<Queue, number | undefined> = (s: Queue) => {
        const y = R.concat(s, [x]);
        return [y, undefined]
    }
    return state
}



export const dequeue: State<Queue, number> = (s: Queue) => {

    const output: number = s[0]
    return [s.slice(1), output]

}

export const queueManip: State<Queue, number> = (s: Queue) => {
    
    const state = bind(dequeue, (x: number) => bind((s)=>[enqueue(x*2)(s)[0],enqueue(x*2)(s)[0]],(s)=>bind((s)=>[enqueue(x/3)(s)[0],enqueue(x/3)(s)[0]],(s)=>dequeue)))
    return state(s)

}
