import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {areaFetched, setId, setName} from './selectAreaSlice';
import {selectedId, selectedName, fullListToSelect} from './selectAreaSlice';

import SelectComponent from '../selectComponent/selectComponent';
import {fetchGameArea} from '../../app/api';

export default function SelectArea(props: any){

  const dispatch = useDispatch();

  // Возьмем что нужно из стейта редакса
  const areaId = useSelector(selectedId);
  const areaName = useSelector(selectedName);
  const fullAreaListToSelect = useSelector(fullListToSelect);

  /* ------------------------------------------
  загрузим при монтировании список регионов
  ------------------------------------------ */
  useEffect(() => {
    // выберем данные из апи
    fetchGameArea((data: any)=>{
      dispatch(areaFetched(data));
    });
  }, []);

  return (
    <SelectComponent
      selectedId={areaId}
      selectedName={areaName}
      fullListToSelect={fullAreaListToSelect}
      setIdAction = {setId}
      setNameAction = {setName}
      placeholder = {"select area"}
    />
  )
}