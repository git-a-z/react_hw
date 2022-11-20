import { initState } from './initState'

export const profileReducer = (state = initState, action) => {
  switch (action.type) {
    case 'TOGGLE_SHOW_NAME_ACTION':
      return {
        ...state,
        showName: !state.showName
      }
    default:
      return state
  }
}
