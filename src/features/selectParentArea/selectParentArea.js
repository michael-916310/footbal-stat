import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {parentAreaFetched} from './parentAreaSlice';
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

  function handleOnKeyDown(e){
    if (e.key==='ArrowDown') {
      // отобразим список
      setIsListOpen(true);
    }
    if (e.code==='Escape' || e.code==='ArrowUp') {
      // скроем список
      setIsListOpen(false);
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
          />
        </button>
      </div>

      {(isListOpen &&
          <div className="select-parent-area__list">
            {
              listToSelect.map(el => {
                return (
                  <div key={el.id} className="select-parent-area__item">
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