import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {parentAreaFetched, setId, setName} from './parentAreaSlice';
import {fetchGameArea} from '../../app/api';
import {selectedId, selectedName, fullListToSelect, iParentAreaList} from './parentAreaSlice';

import './selectParentArea.scss';

import downarrow_png from './../../img/downarrow20.png';
import clear_png from './../../img/clear20.png';

export default function SelectParentArea(props: any){

  let [viewValue, setViewValue] = useState('');
  let [isListOpen, setIsListOpen] = useState(false);
  let [listToSelect, setListToSelect] = useState<iParentAreaList[]>([]);
  let [listKeyboardPosition, setListKeyboardPosition] = useState(0);

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
    fetchGameArea((data: any)=>{
      dispatch(parentAreaFetched(data));
    });
  }, []);

  // useEffect(() => {
  //   // запишем в viewValue текущее значение из стора
  //   setViewValue(areaName);
  // }, [areaName, areaId]);

  function filterListToSelect(value: string){
    // отфильтруем список
    const list: Array<iParentAreaList> = parentArealist.filter((el)=>{
      return el.name.toUpperCase().includes(value.toUpperCase());
    });
    setListToSelect(list);
    setListKeyboardPosition(0);
  }

  function handleViewValueChange(e: any){
    const v = e.target.value;
    setViewValue(v);

    filterListToSelect(v);
    setIsListOpen(true);

    dispatch(setId(0));
    dispatch(setName(''));

    console.log('handleViewValueChange');
  }

  function handleOpenClick(){
    setIsListOpen(!isListOpen);
    filterListToSelect(viewValue);
  }

  function handleClearClick(){
    dispatch(setId(0));
    dispatch(setName(''));
    filterListToSelect('');
    setViewValue('');
  }

  function setParentArea(id: number, name: string){
    dispatch(setId(id));
    dispatch(setName(name));
    setViewValue(name);
    setIsListOpen(false);
  }

  function handleSelectValue(id?: number, name?: string){
    if (id && name) {
      setParentArea(id, name);
    } else if (listKeyboardPosition >=0 && listKeyboardPosition <= (listToSelect.length-1)) {
      const el = listToSelect[listKeyboardPosition];
      setParentArea(el.id, el.name);
    }
  }

  function handleOnKeyDown(e: any){
    if (e.key==='ArrowDown') {
      if (isListOpen) {
        // изменим позицию "курсора"
        setListKeyboardPosition((listKeyboardPosition<(listToSelect.length-1))?++listKeyboardPosition: listKeyboardPosition);
      } else {
        // отобразим список
        filterListToSelect(viewValue);
        setIsListOpen(true);
      }
    }
    if (e.code==='Escape') {
      // скроем список
      setIsListOpen(false);
    }
    if (e.code==='ArrowUp') {
      // изменим позицию "курсора"
      setListKeyboardPosition((listKeyboardPosition>=1) ? --listKeyboardPosition : 0);
    }
    if ((e.code==='Enter') || (e.code==='Tab')) {
      handleSelectValue();
    }

  }

  function handleOnKeyDownClearBtn(e: any){
    if (e.code==='Enter') {
      handleClearClick();
    }
  }

  function handleOnKeyDownArrowBtn(e: any) {
    if (e.code==='Enter') {
      handleOpenClick();
    }
  }

  let classInputList = "select-parent-area__input";
  if (viewValue === areaName) {
    classInputList = classInputList + ' select-parent-area__input-OK';
  }

  let classLineList = "select-parent-area__line";
  if (areaId === 0) {
    classLineList = classLineList + ' select-parent-area__line-warning'
  }

  return (
    <React.Fragment>
      <div className={classLineList}>
        <input
          type="text"
          className={classInputList}
          placeholder="select parent area"
          value={viewValue}
          onChange={handleViewValueChange}
          onKeyDown={handleOnKeyDown}
        />
        <button
          className="select-parent-area__down-arrow-button"
          onKeyDown={handleOnKeyDownArrowBtn}>
          <img
            src={downarrow_png}
            alt="open list"
            onClick={handleOpenClick}
          />
        </button>
        <button
          className="select-parent-area__clear-arrow-button"
          onKeyDown={handleOnKeyDownClearBtn}>
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
              listToSelect.map((el,index) => {
                let classNameList: string = "select-parent-area__item";
                if (listKeyboardPosition === index) {
                  classNameList = classNameList + ' select-parent-area__item-current';
                }
                return (
                  <div
                    key={el.id}
                    className={classNameList}
                    onClick={()=>{handleSelectValue(el.id, el.name)}}
                  >
                    {el.name}
                  </div>
                )
              })
            }
          </div>
      )}
    </React.Fragment>
  )
}