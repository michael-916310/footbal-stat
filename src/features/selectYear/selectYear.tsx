import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';

import SelectComponent from '../selectComponent/selectComponent';
import {getSelectedYear } from './selectYearSlice';
import {
  onYearFetched as onYearFetchedAction,
  onSelectYear as onSelectYearAction,
  onResetYear as onResetYearAction,
  onResetViewValue as onResetViewValueAction,
} from './selectYearSlice';

import {fetchData} from '../../app/api';

import {getSelectedArea} from './../selectArea/selectAreaSlice';

export default function SelectYear(){

  const dispatch = useDispatch();
  const {id, name, list: fullList, needResetViewValue} = useSelector(getSelectedYear);
  const {id: areaId, name: areaName} = useSelector(getSelectedArea);


  useEffect(() => {
    // сбросим текущее значение
    dispatch(onResetYearAction());

    fetchData(
      'https://api.football-data.org/v2/competitions',
      (data: any)=>{
        data.selectedArea = {};
        data.selectedArea.id=areaId;
        data.selectedArea.areaName=areaName;

        dispatch(onYearFetchedAction(data));
      },
      'competitions'
    );

  }, [areaId]);

  return (
    <div>
      <SelectComponent
        selectedId={id}
        selectedName={name}
        fullListToSelect={fullList}
        onSelectAreaAction = {onSelectYearAction}
        placeholder = {"select year"}
        needResetViewValue = {needResetViewValue}
        onResetViewValueAction = {onResetViewValueAction}
      />
    </div>
  )
}