import * as allTypes from '../action/actionTypes'

const errorDefault = {
  id: 0,
  errors: []
}

const errorsReducer = (state=errorDefault, action) => {
  switch (action.type) {
    case allTypes.ADD_ERROR:
      if (state.errors.includes(action.error)) {
        return state
      }

      return {
        id: state.id+1,
        errors: [
          ...state.errors,
          {
            id: state.id + 1,
            msg: action.error
          }
        ]
      }
    case allTypes.REMOVE_ERROR:
      const errorListCopy = [...state.errors]
      const filtered = errorListCopy.filter((error) => error.id !== action.id)

      return {
        ...state,
        id: state.id,
        errors: filtered
      }

    default:
      return state
  }
}

export default errorsReducer