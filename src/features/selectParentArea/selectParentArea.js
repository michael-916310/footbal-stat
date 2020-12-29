import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {parentAreaFetched} from '../selectParentArea/parentAreaSlice';
import {fetchGameArea} from '../../app/api';

import {selectedId, selectedName, fullListToSelect} from './parentAreaSlice';

import './selectParentArea.scss';
import downarrow_png from './../../img/downarrow20.png';
import clear_png from './../../img/clear20.png';

export default function SelectParentArea(props){

  let [viewValue, setViewValue] = useState('');
  let [listToSelect, setlistToSelect] = useState([]);

  const dispatch = useDispatch();

  /* ------------------------------------------
  загрузим при монтировании список регионов
  ------------------------------------------ */
  useEffect(() => {
    fetchGameArea((data)=>{
      dispatch(parentAreaFetched(data));
    });
  }, []);

  const areaId = useSelector(selectedId);
  const areaName = useSelector(selectedName);
  const parentArealist = useSelector(fullListToSelect);
  let list=[];


  function handleViewValueChange(e){
    const v = e.target.value;
    setViewValue(v);
    list=parentArealist.filter((el)=>{
      return el.name.toUpperCase().includes(v.toUpperCase());
    });
    console.log('handleViewValueChange',list);
    setlistToSelect(list);
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
        />
        <button className="select-parent-area__down-arrow">
          <img
            src={downarrow_png}
            alt="open list"
            className="select-parent-area__down-arrow-img"
          />
        </button>
        <button className="select-parent-area__down-arrow">
          <img
            src={clear_png}
            alt="open list"
            className="select-parent-area__down-arrow-img"
          />
        </button>
      </div>

      {(viewValue &&
          <div className="select-parent-area__list">
            {
              listToSelect.map(el => {
                return (
                  <div>
                    <label><input key={el.id} name="selectValue" type="radio"/>{el.name}</label>
                  </div>
                )
              })
            }
          </div>
      )}
    </article>
  )
}