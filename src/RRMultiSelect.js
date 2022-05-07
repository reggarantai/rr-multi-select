import './RRMultiSelect.css';
import React, { useRef, useState, useEffect } from 'react';
import _ from 'lodash';

const RRMultiSelect = ({ options, inputPlaceholder, placeholderText, value, onChange, inputStyle, isObject }) => {

  const [isVisible, setIsVisible] = useState(!1);
  const [selected, setSelected] = useState(value);
  const [list, setList] = useState(options);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(()=>{
    if(value){
      setSelected(value)
    }
  },[value])

  function useOutsideHandle(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setIsVisible(!1)
        }
      }
      document.addEventListener("click", handleClickOutside);
      return () => {
        document.removeEventListener("click", handleClickOutside);
      };
    }, [ref]);
  }

  const wrapperRef = useRef();
  useOutsideHandle(wrapperRef);

  const open = (e) => {
    e.preventDefault();
    if(!e.target.classList.contains('fa-times')){
      setSearchTerm('');
      if(options){
        setList(options)
      }
      setIsVisible(1)
    }
  }

  const onType = (e) => {
    const v = e.target.value
    setSearchTerm(v)
    const result = options.filter((d) => {
      return (isObject ? d[isObject[1]] : d).toLowerCase().includes(v.toLowerCase())
    });
    setList(result)
  }

  const thisClick = (e,v) => {
    if(e.target.nodeName === 'LI'){
      e.target.classList.toggle('a')
    }else{
      e.target.parentElement.classList.toggle('a')
    }
    const s = !_.find(selected,(d)=>{return d === v}) ? [...selected,v] : _.remove(selected, (d)=>{return d !== v})
    setSelected(s)
    if(onChange){
      onChange(s)
    }
  }

  return (
    <div className="rrms" ref={wrapperRef}>
      <div className="rrms-field">

        <div className="rrms-value" onClick={open}>
          {
            selected.length ? (
              <>
                {
                  selected.map((d)=>{
                    return (
                      <span key={isObject ? d[isObject[0]] : d}>{isObject ? d[isObject[1]] : d}</span>
                    )
                  })
                }
              </>
            ) : <>{placeholderText || 'Select...'}</>
          }
        </div>
        <div className="rrms-icons" onClick={selected.length ? ()=>{
          setSelected([])
          if(onChange){
            onChange([])}
          } : open }>
          {
            selected.length ? <span>✕</span> : <span><i className="rrms-caret"/></span>
          }

        </div>
      </div>
      {isVisible && (
        <div className="rrms-input">
          <input
            type="text"
            value={searchTerm}
            onChange={onType}
            autoComplete="off"
            placeholder={inputPlaceholder || 'Type to search...'}
            autoFocus
          />
          <ul className="rrms-list">
            {
              list.length ? list.map((d)=>{
                const v = isObject ? d[isObject[0]] : d
                const l = isObject ? d[isObject[1]] : d
                return (
                  <li key={v} onClick={(e)=>thisClick(e,d)} className={_.find(selected,(s)=>{return s === d}) ? 'a' : ''}>
                    <div>{l}</div>
                  </li>
                )
              }) : <li>No result!</li>
            }
          </ul>
        </div>
      )}

    </div>
  );
};

export default RRMultiSelect;
