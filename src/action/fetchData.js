import axios from 'axios';
import * as allTypes from './actionTypes';
import { setActiveList } from './setActiveList'

const apiHost = 'https://www.stackadapt.com'



const fetchCryptos = () => async (dispatch) => {
  try {
    dispatch({
      type: allTypes.FETCH_CRYPTOS_REQUEST,
    })
    const response = await axios.get(`${apiHost}/coinmarketcap/map`, {
      params: { limit: 10 }
    })

    const results = response.data.data

    dispatch({
      type: allTypes.FETCH_CRYPTOS_SUCCESS,
      cryptoPreview: results,
    })
  } catch (error) {
    dispatch({
      type: allTypes.ADD_ERROR,
      error: error.toString()
    })
  }
}


export const fetchQoute = (cryptoId) => async (dispatch) => {
  dispatch({
    type: allTypes.FETCH_QUOTE_REQUEST,
  })
  try {
    const response = await axios.get(`${apiHost}/coinmarketcap/quotes`, {
      params: { id: cryptoId }
    })

    dispatch({
      type: allTypes.FETCH_QUOTE_SUCCESS,
      payload: response.data.data,
    })
  } catch (error) {
    dispatch({
      type: allTypes.ADD_ERROR,
      error: error.toString()
    })
  }
}

export const fetchFiveCryptos = () => async (dispatch, getState) => {
  await dispatch(fetchCryptos())

  const cryptoList = getState().cryptos.cryptoPreview
  const topFive = cryptoList.slice(0, 5)

  const topFiveIds = topFive.map((cypto) => {
    return cypto.id
  })

  topFiveIds.forEach((id) => {
    dispatch(fetchQoute(id))
  })

  dispatch(setActiveList(topFiveIds))
}