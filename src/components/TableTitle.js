import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSortUp, faCaretDown } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components'
import { sortCryptos } from '../action/setActiveList'

const Title = styled.th`
  cursor: pointer;
`

const Caret = styled.span`
  margin-right: 12px;
`

const TableTitle = ({ name, label, id }) => {
  const dispatch = useDispatch()
  const sortBy = useSelector((state) => state.cryptoSortName)

  const handleSortClick = (sortBy) => {
    dispatch(sortCryptos(sortBy))
  }

  if (sortBy.name === name) {
    return (
      <Title
        key={id}
        onClick={() => { handleSortClick(name) }}
        >
        {sortBy.direction === 'asc' ?
          <Caret>
            <FontAwesomeIcon icon={faCaretDown}/>
          </Caret>
          :
          <Caret>
            <FontAwesomeIcon icon={faSortUp}/>
          </Caret>
        }
        {label}
      </Title>
    )
  }

  return (
    <Title
      key={id}
      onClick={() => { handleSortClick(name) }}
    >
      {label}
    </Title>
  )
}

export default TableTitle