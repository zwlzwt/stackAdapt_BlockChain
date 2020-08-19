import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components'
import { removeActive } from '../action/setActiveList'

const RemoveBtn = styled.button`
  border: none;
  color: #f5f6fa;
  background: transparent;
  font-size: 18px;
  outline: none;
  cursor: pointer;
  &:hover {
    color: #f15b41;
  }
`


const TableItem = ({ id, name, symbol, cmc_rank, price }) => {
  const dispatch = useDispatch()
  const activeIds = useSelector((state) => state.cryptos.activeIds)

  const handleRemove = (id) => {
    dispatch(removeActive(id))
  }

  return (
    <tr>
      <td>{cmc_rank}</td>
      <td>{symbol}</td>
      <td>{name}</td>
      <td>${price > 1 ? price.toFixed(2) : price}</td>
      <td>
        {
          activeIds.length > 1
            ? <RemoveBtn onClick={() => handleRemove(id)}>
              <FontAwesomeIcon icon={faTimes} />
            </RemoveBtn>
            : null
        }
        
      </td>
    </tr>
  )
}

export default TableItem