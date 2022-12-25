import '@testing-library/jest-dom'
import { CHANGE_NAME, IS_AUTH, changeName, auth } from './actions'

describe('changeName', () => {
    it('should return the New name', () => {
        expect(changeName('New name', {})).toEqual({
            type: CHANGE_NAME,
            payload: 'New name',
        });
    });

    it('should return the data', () => {
        expect(auth('data', {})).toEqual({
            type: IS_AUTH,
            payload: 'data',
        });
    });
})
