import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {parentAreaFetched, getSelectedArea} from './parentParentAreaSlice';
import {fetchGameArea} from '../../app/api';
import {getfullListToSelect, onSelectArea as onSelectAreaAction} from './parentParentAreaSlice';

import SelectComponent from '../selectComponent/selectComponent';


export default function SelectParentArea(props: any){


  const dispatch = useDispatch();

  // Возьмем что нужно из стейта редакса
  const {id, name} = useSelector(getSelectedArea);
  const fullParentArealist = useSelector(getfullListToSelect);

  /* ------------------------------------------
  загрузим при монтировании список регионов
  ------------------------------------------ */
  useEffect(() => {
    // выберем данные из апи
    fetchGameArea((data: any)=>{
      dispatch(parentAreaFetched(data));
    });
  }, []);


  return (
    <SelectComponent
      selectedId={id}
      selectedName={name}
      fullListToSelect={fullParentArealist}
      onSelectAreaAction = {onSelectAreaAction}
      placeholder = {"select parent area"}
    />
  )
}