import * as allTypes from './actionTypes';
import { fetchQoute } from './fetchData';

export const addActive = (id) => async (dispatch) => {
  dispatch(fetchQoute(id))
  dispatch({
    type: allTypes.ADD_ACTIVE,
    id
  })
}

export const removeActive = (id) => {
  return {
    type: allTypes.REMOVE_ACTIVE,
    id
  }
}

export const sortCryptos = (name) => (dispatch, getState) => {
  const currentStatus = getState().cryptoSortName
  let direction = 'asc'
  if (currentStatus.name === name && currentStatus.direction === 'asc') {
    direction = 'desc'
  }
  dispatch({
    type: allTypes.SORT_CRYPTOS,
    name: name,
    direction: direction
  })
  dispatch({
    type: allTypes.SORT_TYPE,
    name: name,
    direction: direction
  })
}

export const setActiveList = (ids) => {
  return {
    type: allTypes.ACTIVE_IDS,
    activeIds: ids
  }
}