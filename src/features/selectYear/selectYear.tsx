import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';

import SelectComponent from '../selectComponent/selectComponent';
import {getSelectedYear } from './selectYearSlice';
import {onYearFetched as onYearFetchedAction, onSelectYear as onSelectYearAction} from './selectYearSlice';

import {fetchData} from '../../app/api';

import {getSelectedArea} from './../selectArea/selectAreaSlice';

export default function SelectYear(){

  const dispatch = useDispatch();
  const {id, name, list: fullList} = useSelector(getSelectedYear);
  const {id: areaId, name: areaName} = useSelector(getSelectedArea);


  useEffect(() => {
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

  console.log('render', fullList);
  return (
    <div>
      <SelectComponent
        selectedId={id}
        selectedName={name}
        fullListToSelect={fullList}
        onSelectAreaAction = {onSelectYearAction}
        placeholder = {"select year"}
        resetViewValue = {false}
      />
    </div>
  )
}