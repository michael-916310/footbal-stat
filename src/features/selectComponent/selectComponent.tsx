import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './selectComponent.scss';

import downarrow_png from './../../img/downarrow20.png';
import clear_png from './../../img/clear20.png';

export default function SelectComponent(props: any){

  //let iListItem = props.iListItem;
  let selectedId = props.selectedId;
  let selectedName = props.selectedName;
  let fullListToSelect = props.fullListToSelect;
  let setIdAction = props.setIdAction;
  let setNameAction = props.setNameAction;
  let placeholder = props.placeholder;

  let [viewValue, setViewValue] = useState('');
  let [isListOpen, setIsListOpen] = useState(false);
  //let [listToSelect, setListToSelect] = useState<iListItem[]>([]);
  let [listToSelect, setListToSelect] = useState([]);
  let [listKeyboardPosition, setListKeyboardPosition] = useState(0);

  const dispatch = useDispatch();

  function filterListToSelect(value: string){
    // отфильтруем список
    //const list: Array<iAreaList> = fullListToSelect.filter((el: any)=>{
    const list = fullListToSelect.filter((el: any)=>{
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

    dispatch(setIdAction(0));
    dispatch(setNameAction(''));
  }

  function handleOpenClick(){
    setIsListOpen(!isListOpen);
    filterListToSelect(viewValue);
  }

  function handleClearClick(){
    dispatch(setIdAction(0));
    dispatch(setNameAction(''));
    filterListToSelect('');
    setViewValue('');
  }

  function setParentArea(id: number, name: string){
    dispatch(setIdAction(id));
    dispatch(setNameAction(name));
    setViewValue(name);
    setIsListOpen(false);
  }

  function handleSelectValue(id?: number, name?: string){
    if (id && name) {
      setParentArea(id, name);
    } else if (listKeyboardPosition >=0 && listKeyboardPosition <= (listToSelect.length-1)) {
      const el: any = listToSelect[listKeyboardPosition];
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

  let classInputList = "select-component__input";
  if (viewValue === selectedName) {
    classInputList = classInputList + ' select-component__input-OK';
  }

  let classLineList = "select-component__line";
  if (selectedId === 0) {
    classLineList = classLineList + ' select-component__line-warning'
  }

  return (
    <section>
      <div className={classLineList}>
        <input
          type="text"
          className={classInputList}
          placeholder={placeholder}
          value={viewValue}
          onChange={handleViewValueChange}
          onKeyDown={handleOnKeyDown}
        />
        <button
          className="select-component__down-arrow-button"
          onKeyDown={handleOnKeyDownArrowBtn}>
          <img
            src={downarrow_png}
            alt="open list"
            onClick={handleOpenClick}
          />
        </button>
        <button
          className="select-component__clear-arrow-button"
          onKeyDown={handleOnKeyDownClearBtn}>
          <img
            src={clear_png}
            alt="clear list"
            onClick = {handleClearClick}
          />
        </button>
      </div>

      {(isListOpen &&
          <div className="select-component__list">
            {
              listToSelect.map((el: any, index: number) => {
                let classNameList: string = "select-component__item";
                if (listKeyboardPosition === index) {
                  classNameList = classNameList + ' select-component__item-current';
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
    </section>
  )
}