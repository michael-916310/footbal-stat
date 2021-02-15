import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {parentAreaFetched, getSelectedArea} from './parentParentAreaSlice';
import {fetchData} from '../../app/api';
import {onSelectArea as onSelectAreaAction} from './parentParentAreaSlice';

import SelectComponent from '../selectComponent/selectComponent';


export default function SelectParentArea(props: any){


  const dispatch = useDispatch();

  // Возьмем что нужно из стейта редакса
  const {id, name, list:fullParentArealist } = useSelector(getSelectedArea);
  /* ------------------------------------------
  загрузим при монтировании список регионов
  ------------------------------------------ */
  useEffect(() => {
    // выберем данные из апи
    fetchData(
      'https://api.football-data.org/v2/areas',
      (data: any)=>{
        dispatch(parentAreaFetched(data));
      },
      'areas'
    );
  }, []);


  return (
    <SelectComponent
      selectedId={id}
      selectedName={name}
      fullListToSelect={fullParentArealist}
      onSelectAreaAction = {onSelectAreaAction}
      placeholder = {"select parent area"}
      resetViewValue = {false}
    />
  )
}