import * as allTypes from './actionTypes'

export const removeError = (errorId) => {
  return {
    type: allTypes.REMOVE_ERROR,
    id: errorId
  }
}