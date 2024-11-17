export  const sum = (a: number, b: number): number => {
    return a + b
}

export const stringLength = (string:string):number => {
    return string.length
}

export const isPalindrome = (string:string):boolean => {
    return string === string.split('').reverse().join('')
}

export const sortArray = (array:number[]):number[] => {
    return array.sort((a, b) => a - b)
}

export const sqrt = (number:number):number => {
    if (number < 0) {
        return -1
    }
    return Math.sqrt(number)
}

export const sumArray = (array:number[]):number =>{
    return array.reduce((a, b) => a + b, 0)

} 


export const sumArrayGreaterThanNine = (array:number[]):number =>{
    return array.reduce((a, b) => a + b, 9)

}



export const nextFibonacci = (array:number[]):number => {
    if (array.length < 2) {
        return 1
    }
    if (!isFibonacci(array)) {
        return -1
     }
     

    return array[array.length - 1] + array[array.length - 2];
}

export const isFibonacci = (array:number[]):boolean => {
    for (let i = 2; i < array.length; i++) {
        if (array[i] !== array[i - 1] + array[i - 2]) {
            return false
        }
    }
    return true
}