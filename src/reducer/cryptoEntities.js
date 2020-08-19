import * as allTypes from '../action/actionTypes'
import _ from 'lodash'

const defaultState = {
  cryptoPreview: [],
  cryptoQute: {},
  activeIds: []
}
const cryptos = (state=defaultState, action) => {
  switch (action.type) {
    case allTypes.FETCH_CRYPTOS_REQUEST:
    case allTypes.FETCH_CRYPTOS_SUCCESS:
      return {
        ...state,
        cryptoPreview: action.cryptoPreview || [],
      }
    case allTypes.FETCH_QUOTE_REQUEST:
    case allTypes.FETCH_QUOTE_SUCCESS:
      const originCryptoQute = state.cryptoQute
      return {
        ...state,
        cryptoQute: {
          ...originCryptoQute,
          ...action.payload
        }
      }
    case allTypes.ACTIVE_IDS:
      return {
        ...state,
        activeIds: action.activeIds
      }
    case allTypes.ADD_ACTIVE:
      return {
        ...state,
        activeIds: [
          ...state.activeIds,
          action.id
        ]
      }
    case allTypes.REMOVE_ACTIVE:
      return {
        ...state,
        activeIds: state.activeIds.filter((id) => id !== action.id)
      }
    case allTypes.SORT_CRYPTOS:
      const sortName = action.name;
      const sortDir = action.direction;
      const sortedState = state.activeIds.map((id) => state.cryptoQute[id])
      const sorted = _.orderBy(sortedState, [sortName], [sortDir])
      return {
        ...state,
        activeIds: sorted.map((item) => item.id)
      }
    default:
      return state
  }
}

export default cryptos