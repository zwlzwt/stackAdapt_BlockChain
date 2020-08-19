import React, { useState, useEffect, useRef} from 'react';
import styled from 'styled-components';
import { addActive } from '../action/setActiveList'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'

const Select = styled.div`
  position: relative;
  text-align: left;
  cursor: pointer;
  background-color: #424242;
  margin-bottom: 50px;
`

const SelectLabel = styled.div`
  font-weight: 100;
  border-bottom: solid 2px #03A9F4;
  margin-top: 10px;
  padding: 15px;
  min-height: 20px;
  color: #fff;
`

const ArrowDown = styled.h1`
  display: inline-block;
  position: absolute;
  right: 18px;
  color: #03A9F4;
`

const SelectOptions = styled.div`
  background: #f4f5f7;
  position: absolute;
  min-height: 50px;
  max-height: 170px;
  left: 0px;
  right: 0px;
  margin: auto;
  overflow: scroll;
  box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, .2);
  z-index: 2;

  div {
    padding: 13px;
    &:hover {
      background: rgba(0, 0, 0, .1);
    }
  }
`

const DropDownSelect = ({options, label, dispatch}) => {
  const DropDownEl = useRef(null);
  const [ active, setActive ] = useState(false);

  useEffect(() => {
    const clickHandle = (event) => {
      if (DropDownEl.current.contains(event.target)) return;
      setActive(false)
    }
    document.addEventListener('click', clickHandle)
    return () => {
      document.removeEventListener('click', clickHandle)
    }
  }, [])


  const handleTrigger = () => {
    setActive(!active)
  }

  const addItem = (id) => {
    dispatch(addActive(id))
  }

  return (
    <Select ref={DropDownEl} onClick={handleTrigger}>
      <SelectLabel>
        {label}
        <ArrowDown>
          <FontAwesomeIcon icon={faChevronDown} />
        </ArrowDown>
      </SelectLabel>
      {
        active ?
        <SelectOptions>
          {
            !options.length 
            ? <div>{'no options'}</div>
            : options.map((option) => {
              return (
                <div key={option.id} onClick={() => addItem(option.id)}>
                  {`${option.symbol}-${option.name}`}
                </div>
              )
            })
          }
        </SelectOptions>
        : null
      }
      
    </Select>
  )
}

export default DropDownSelect;