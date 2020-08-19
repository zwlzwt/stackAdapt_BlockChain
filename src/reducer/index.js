import { combineReducers } from 'redux'
import cryptos from './cryptoEntities'
import cryptoSortName from './sortType'
import errors from './handlerError'

export default combineReducers({
  cryptos,
  cryptoSortName,
  errors
})