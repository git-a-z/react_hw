export const CHANGE_NAME = 'PROFILE::CHANGE_NAME';
export const IS_AUTH = 'IS_AUTH';

export const changeName = (newName) => ({
    type: CHANGE_NAME,
    payload: newName,
});

export const auth = (data) => {
    return { type: IS_AUTH, payload: data }
}
