import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {parentAreaFetched, setId, setName} from './parentAreaSlice';

import {fetchGameArea} from '../../app/api';

import {selectedId, selectedName, fullListToSelect} from './parentAreaSlice';

import './selectParentArea.scss';
import downarrow_png from './../../img/downarrow20.png';
import clear_png from './../../img/clear20.png';

export default function SelectParentArea(props){

  let [viewValue, setViewValue] = useState('');
  let [isListOpen, setIsListOpen] = useState(false);
  let [listToSelect, setListToSelect] = useState([]);

  const dispatch = useDispatch();

  // Возьмем что нужно из стейта редакса
  const areaId = useSelector(selectedId);
  const areaName = useSelector(selectedName);
  const parentArealist = useSelector(fullListToSelect);

  /* ------------------------------------------
  загрузим при монтировании список регионов
  ------------------------------------------ */
  useEffect(() => {
    // выберем данные из апи
    fetchGameArea((data)=>{
      dispatch(parentAreaFetched(data));
    });
  }, []);

  useEffect(() => {
    // запишем в viewValue текущее значение из стора
    setViewValue(areaName);
  }, [areaName, areaId]);


  function handleViewValueChange(e){
    const v = e.target.value;
    setViewValue(v);

    // отфильтруем список
    const list=parentArealist.filter((el)=>{
      return el.name.toUpperCase().includes(v.toUpperCase());
    });
    setListToSelect(list);

    // отобразим список
    setIsListOpen(true);
  }

  function handleOpenClick(){
    setIsListOpen(!isListOpen);
    if (!viewValue) {
      setListToSelect(parentArealist);
    }
  }

  function handleClearClick(){
    dispatch(setId(0));
    dispatch(setName(''));
  }

  function setParentArea(id, name){
    dispatch(setId(id));
    dispatch(setName(name));
    setIsListOpen(false);
  }

  function handleSelectValue(id, name){
    if (listToSelect.length === 1) {
      setParentArea(listToSelect[0].id, listToSelect[0].name);
    } else if (id && name) {
      setParentArea(id, name);
    }
  }

  function handleOnKeyDown(e){
    if (!viewValue) {
      setListToSelect(parentArealist);
    }
    if (e.key==='ArrowDown') {
      // отобразим список
      setIsListOpen(true);
    }
    if (e.code==='Escape' || e.code==='ArrowUp') {
      // скроем список
      setIsListOpen(false);
    }
    if (e.code==='Enter') {
      handleSelectValue();
    }

  }

  return (
    <article className="select-parent-area__container">

      <div className="select-parent-area__line">
        <input
          type="text"
          className="select-parent-area__input"
          placeholder="select parent area"
          value={viewValue}
          onChange={handleViewValueChange}
          onKeyDown={handleOnKeyDown}
        />
        <button className="select-parent-area__down-arrow-button">
          <img
            src={downarrow_png}
            alt="open list"
            onClick={handleOpenClick}
          />
        </button>
        <button className="select-parent-area__clear-arrow-button">
          <img
            src={clear_png}
            alt="clear list"
            onClick = {handleClearClick}
          />
        </button>
      </div>

      {(isListOpen &&
          <div className="select-parent-area__list">
            {
              listToSelect.map(el => {
                return (
                  <div
                    key={el.id}
                    className="select-parent-area__item"
                    onClick={()=>{handleSelectValue(el.id, el.name)}}
                  >
                    {el.name}
                  </div>
                )
              })
            }
          </div>
      )}
    </article>
  )
}