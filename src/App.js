import React, { useEffect } from 'react';
import DropDownSelect from './components/DropDownSelect';
import TableList from './components/TableList';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux'
import { createSelector } from 'reselect';
import { fetchFiveCryptos } from './action/fetchData'
import ErrorHander from './components/ErrorHandler'

const MainContainer = styled.div`
  width: 80%;
  margin: 0 auto;
  padding: 50px 0;
`


function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchFiveCryptos())
  }, [dispatch])

  const selectUnActiveItems = createSelector(
    state => state.cryptos.cryptoPreview || [],
    state => state.cryptos.activeIds || [],
    (list, ids) => list.filter((item) => !ids.includes(item.id))
  )

  const options = useSelector(selectUnActiveItems)

  return (
    <>
      <MainContainer>
        <DropDownSelect
          dispatch={dispatch}
          options={options} 
          label={'Select Cryptocurrency to add'}
        />
        <TableList />
      </MainContainer>
      <ErrorHander/>
    </>
  );
}

export default App;
