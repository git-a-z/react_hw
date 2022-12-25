import '@testing-library/jest-dom'
import { initState, profileReducer } from './reducer'
import { CHANGE_NAME, IS_AUTH } from './actions'

describe('initState', () => {
    it('should return the initial state', () => {
        expect(initState).toEqual(initState);
    });
})

describe('profileReducer', () => {
    it('should return the initial state', () => {
        expect(profileReducer(undefined, {})).toEqual(initState);
    });

    it('should return the initial state and New name', () => {
        expect(profileReducer(undefined, {
            type: CHANGE_NAME,
            payload: 'New name'
        })).toEqual({
            ...initState,
            profileName: 'New name'
        });
    });

    it('should return the initial state and auth', () => {
        expect(profileReducer(undefined, {
            type: IS_AUTH,
            payload: true
        })).toEqual({
            ...initState,
            isAuth: true
        });
    });
})
