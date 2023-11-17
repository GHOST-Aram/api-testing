import { describe, test, expect } from '@jest/globals'

describe('Sum Module', () =>{
    test('Adds up to 10', () =>{
        const sum = 2 + 8

        expect(sum).toEqual(10)
    })
})