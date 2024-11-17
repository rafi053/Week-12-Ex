import { describe } from 'node:test'
import { nextFibonacci, isPalindrome, sortArray, sqrt, stringLength, sum, sumArray, sumArrayGreaterThanNine } from './math';


describe( 'check the function sum of two numbers', () => {
    test('sanity test', () => {
        expect(sum(4, 3)).toBe(7)
    })

    const arr = [[-1, -3, -4], [2, 2, 4], [2,1,3]]

   
        test.each(arr)('sum(%i, %j) should return %s', (a, b, expected) => {
            expect(sum(a, b)).toBe(expected);
        })
    })



describe( 'check the function length of string', ()=>{
    test('frost test of length of string', ()=>{
        expect(stringLength('abc d')).toBe(5);

    })
})

describe( 'check the function is palindrome of string', ()=>{
    test('frost test of is palindrome', ()=>{
        expect(isPalindrome('racecar')).toBe(true);
        expect(isPalindrome('hello')).toBe(false);
    })
})

describe( 'check the function sort array', ()=>{
    test('frost test of sort array', ()=>{
        expect(sortArray([1,2,3,4,5])).toEqual([1,2,3,4,5]);
        expect(sortArray([5,-4,3,2,1])).toEqual([-4,1,2,3,5]);
    })
})

describe( 'check the function sqrt of number', ()=>{
    test('frost test of sqrt', ()=>{
        expect(sqrt(4)).toBe(2);
        expect(sqrt(-4)).toBe(-1);
    })
})

describe( 'check the function sumArray', ()=>{
    test('frost test of sumArray', ()=>{
        expect(sumArray([1,2,3,4,5])).toBe(15);
    })
})

describe( 'check the function sumArrayGreaterThanNine', ()=>{
    test('frost test of sumArrayGreaterThanNine', ()=>{
        expect(sumArrayGreaterThanNine([3,4])).toBe(16);
    })
})

describe( 'check the function fibonacci', ()=>{
    test('frost test of fibonacci', ()=>{
        expect(nextFibonacci([0,1])).toBe(1);
        expect(nextFibonacci([0,1,5])).toBe(-1);
        expect(nextFibonacci([0,1,1,2,3,5,8])).toBe(13);
    })
})