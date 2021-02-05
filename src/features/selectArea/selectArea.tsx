import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {onAreaFetched as onAreaFetchedAction, onSelectArea as onSelectAreaAction} from './selectAreaSlice';
import {getFullListToSelect, getSelectedArea} from './selectAreaSlice';

import SelectComponent from '../selectComponent/selectComponent';
import {fetchGameArea} from '../../app/api';

export default function SelectArea(props: any){

  const dispatch = useDispatch();

  const {id, name} = useSelector(getSelectedArea);
  const fullAreaListToSelect = useSelector(getFullListToSelect);

  useEffect(() => {
    // выберем данные из апи
    fetchGameArea((data: any)=>{
      dispatch(onAreaFetchedAction(data));
    });
  }, []);

  return (
    <SelectComponent
      selectedId={id}
      selectedName={name}
      fullListToSelect={fullAreaListToSelect}
      onSelectAreaAction = {onSelectAreaAction}
      placeholder = {"select area"}
    />
  )
}