import * as R from "ramda";
const vowels = ["a", "e", "i", "o", "u", "A", "E", "I", "O", "U"];
const stringToArray = R.split("");
const toFilter = (char: string) => {
    if (R.includes(char, vowels))
        return true
    else
        return false
}
/* Question 1 */
export const countVowels = (input: string): number => {
    const arr = stringToArray(input)
    const arrs = R.filter(toFilter, arr)
    return arrs.length
}
//console.log(countVowels(""))


/* Question 2 */
export const runLengthEncoding = (str: string) => {
    const arr = stringToArray(str);
    return helper(arr, 0, 1);
};
const helper = (arr: string[], num: number, counter: number): string => {
    if (num === arr.length - 1) {
        if (counter === 1)
            return arr[num]
        return arr[num] + counter
    }
    else {
        if (arr[num] === arr[num + 1]) {
            return helper(arr, num + 1, counter + 1);
        }
        else {
            if (counter === 1)
                return arr[num] + helper(arr, num + 1, 1);
            return arr[num] + counter + helper(arr, num + 1, 1);
        }
    }
};
//console.log(runLengthEncoding("aaaabbbbv"))


/* Question 3 */
export const isPaired = (str: string): boolean => {
    const arr = stringToArray(str);
    const ans = R.filter(isFilter, arr);
    console.log(ans)
    return recursia(ans, "", 0)

}
const isFilter = (char: string) => {
    const arr = ["(", ")", "{", "}", "[", "]"];
    return R.includes(char, arr);
}

const recursia = (arr: string[], str: string, index: number): boolean => {
    console.log(str)
    if (index === arr.length)
        return str === "";

    switch (arr[index]) {
        case ")":
            if (str.charAt(str.length - 1) != "(") {
                console.log(str.charAt(str.length - 1))
                return false;
            }
            else
                return recursia(arr, str.substring(0, str.length - 1), index + 1)
        case "}":
            if (str.charAt(str.length - 1) != "{")
                return false;
            else
                return recursia(arr, str.substring(0, str.length - 1), index + 1)
        case "]":
            if (str.charAt(str.length - 1) != "[")
                return false;
            else
                return recursia(arr, str.substring(0, str.length - 1), index + 1)
        default:
            return recursia(arr, str + arr[index], index + 1)
    }
}


