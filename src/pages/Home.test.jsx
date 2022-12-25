import React from 'react'
import '@testing-library/jest-dom'
import { Home } from './Home'

describe('Home', () => {
    it('should return the title Home', () => {
        expect(Home()).toEqual(<h1>Home</h1>);
    });
})
