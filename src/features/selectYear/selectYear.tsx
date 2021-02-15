import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';

import SelectComponent from '../selectComponent/selectComponent';
import {getSelectedYear } from './selectYearSlice';
import {onYearFetched as onYearFetchedAction} from './selectYearSlice';

import {fetchData} from '../../app/api';

export default function SelectYear(){
  const fullList = ['2019', '2020'];

  const dispatch = useDispatch();
  const {id, name} = useSelector(getSelectedYear);

  function onSelectAction() {

  }

  useEffect(() => {
    // сбросим текущее значение
    //dispatch(onResetAreaAction());
    // выберем данные из апи
    fetchData(
      'https://api.football-data.org/v2/competitions',
      (data: any)=>{
        dispatch(onYearFetchedAction(data));
      },
      'competitions'
    );
  }, []);

  return (
    <div>
      <SelectComponent
        selectedId={id}
        selectedName={name}
        fullListToSelect={fullList}
        onSelectAreaAction = {onSelectAction}
        placeholder = {"select year"}
        resetViewValue = {false}
      />
    </div>
  )
}