import * as allTypes from '../action/actionTypes'

const defaultSort = {
  name: '',
  direction: ''
}

const cryptoSortName = (state=defaultSort, action) => {
  switch (action.type) {
    case allTypes.SORT_TYPE:
      return {
        ...state,
        name: action.name,
        direction: action.direction
      }
    default:
      return state
  }

}

export default cryptoSortName