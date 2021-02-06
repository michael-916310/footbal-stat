import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './selectComponent.scss';

import downarrow_png from './../../img/downarrow20.png';
import clear_png from './../../img/clear20.png';

export default function SelectComponent(props: any){

  let selectedId = props.selectedId;
  let selectedName = props.selectedName;
  let fullListToSelect = props.fullListToSelect;
  let placeholder = props.placeholder;
  let onSelectAreaAction = props.onSelectAreaAction;

  let [viewValue, setViewValue] = useState('');
  let [isListOpen, setIsListOpen] = useState(false);
  let [listToSelect, setListToSelect] = useState([]);
  let [listKeyboardPosition, setListKeyboardPosition] = useState(0);

  const dispatch = useDispatch();

  function filterListToSelect(value: string){
    // отфильтруем список
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

    dispatch(onSelectAreaAction({ id:0, name:'' }));
  }

  function handleOpenClick(){
    setIsListOpen(!isListOpen);
    filterListToSelect(viewValue);
  }

  function handleClearClick(){
    dispatch(onSelectAreaAction({ id:0, name:'' }));
    filterListToSelect('');
    setViewValue('');
    setIsListOpen(false);
  }

  function setParentArea(id: number, name: string){
    dispatch(onSelectAreaAction({ id, name }));
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

  function scrollList(){
    if (list_ref.current != null) {
      const el = list_ref.current.children[listKeyboardPosition];
      if (el) {
        el.scrollIntoView(false);
      }
    }
  }

  function handleOnKeyDown(e: any){
    if (e.key==='ArrowDown') {
      if (isListOpen) {
        // изменим позицию "курсора"
        setListKeyboardPosition((listKeyboardPosition<(listToSelect.length-1))?++listKeyboardPosition: listKeyboardPosition);
        scrollList();
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
      scrollList();
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

  const input_ref:React.RefObject<HTMLInputElement> = React.createRef();
  const list_ref:React.RefObject<HTMLInputElement> = React.createRef();

  return (
    <section>
      <div className={classLineList}>
        <input
          type="text"
          ref = {input_ref}
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
          <div
            ref={list_ref}
            className="select-component__list">
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