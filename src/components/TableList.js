import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import TableItem from './TableItem';
import TableTitle from './TableTitle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

const TableContainer = styled.div`
  width: 100%;
  margin-bottom: 16px;
  overflow-x: auto;
  box-shadow: 0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12);
  border-radius: 4px;
  background-color: #424242;
`
const Table = styled.table`
  min-width: 750px;
  width: 100%;
  display: table;
  border-spacing: 0;
  border-collapse: collapse;
  margin-bottom: 30px;

  tr {
    color: inherit;
    display: table-row;
    outline: 0;
    vertical-align: middle;

    th {
      text-align: right;
      color: #fff;
      font-weight: 500;
      line-height: 1.5rem;
      display: table-cell;
      padding: 16px;
      font-size: 16px;
      text-align: left;
      font-family: "Roboto", "Helvetica", "Arial", sans-serif;
      font-weight: 400;
      line-height: 1.43;
      border-bottom: 1px solid rgba(81, 81, 81, 1);
      letter-spacing: 0.01071em;
    }

    td {
      color: #fff;
      display: table-cell;
      padding: 16px;
      font-size: 16px;
      text-align: left;
      font-family: "Roboto", "Helvetica", "Arial", sans-serif;
      font-weight: 400;
      line-height: 1.43;
      border-bottom: 1px solid rgba(81, 81, 81, 1);
      letter-spacing: 0.01071em;
    }
  }
`

const Spinner = styled.div `
  display: flex;
  width: 100%;
  height: 200px;
  justify-content: center;
  align-items: center;
  color: #3ed072;
`

const TableList = () => {
  const selectCryptosList = createSelector(
    state => state.cryptos.cryptoQute,
    state => state.cryptos.activeIds,
    (list, ids) => ids.map((id) => list[id])
  )
  const cryptoIds = useSelector(state => state.cryptos.activeIds)
  const list = useSelector(selectCryptosList)

  return (
    <TableContainer>
      <Table>
        <thead>
          <tr>
            <TableTitle name='cmc_rank' label='CMC_Rank' id={0}/>
            <TableTitle name='symbol' label='Symbol' id={1}/>
            <TableTitle name='name' label='Name' id={2}/>
            <TableTitle name='price' label='Price (USD)' id={3}/>
            <th ></th>
          </tr>
        </thead>
        <tbody>
          {
            list.map((item) => {
              if(item) {
                item.price = item.quote.USD.price
              }
              return item ? <TableItem  {...item} key={item.id}/> : null
            })
          }
        </tbody>
      </Table>
      {cryptoIds.length === 0 ? <Spinner><FontAwesomeIcon icon={faSpinner} spin size="4x" /></Spinner> : ''}
    </TableContainer>
  )
}

export default TableList;