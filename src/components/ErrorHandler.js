import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { removeError } from '../action/handlerError'
import styled from 'styled-components'

const ErrorContainer = styled.div`
  position: fixed;
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  z-index: 3;
  bottom: 50px;
`

const ErrorMsg = styled.div`
  margin-bottom: 5px;
  background-color: #e8454d;;
  color: #f5f6fa;
  display: flex;
  justify-content: space-between;
  padding: 20px;
  width: 80%;
  border-radius: 5px;

  button {
      border: none;
      background: transparent;
      color: #f5f6fa;
      font-size: 18px;
      outline: none;
      cursor: pointer;
    &:hover {
      color: #710925;
    }
  }
`


const ErrorHandler = () => {
  const dispatch = useDispatch()
  const errors = useSelector((state) => state.errors.errors)

  const errorList = errors.map((err) => {
    return (
      <ErrorMsg key={err.id}>
        <span>{err.msg}</span>
        <button onClick={() => { handleClick(err.id) }}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </ErrorMsg>
    )
  })

  const handleClick = (id) => {
    dispatch(removeError(id))
  }

  return (
    <ErrorContainer className='error-container'>
      {errorList}
    </ErrorContainer>
  )
}

export default ErrorHandler