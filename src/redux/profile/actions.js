export const CHANGE_NAME = "PROFILE::CHANGE_NAME";

export const changeName = (newName) => ({
    type: CHANGE_NAME,
    payload: newName,
});
