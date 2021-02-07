import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  onAreaFetched as onAreaFetchedAction,
  onSelectArea as onSelectAreaAction,
  onResetArea as onResetAreaAction,
  onResetViewValue as onResetViewValueAction}
from './selectAreaSlice';

import {getSelectedArea} from './selectAreaSlice';
import {getSelectedArea as getSelectedParentArea} from '../selectParentArea/parentParentAreaSlice';

import SelectComponent from '../selectComponent/selectComponent';
import {fetchGameArea} from '../../app/api';

export default function SelectArea(props: any){

  const dispatch = useDispatch();

  const {id, name, needResetViewValue, list:fullAreaListToSelect} = useSelector(getSelectedArea);
  const {id: parentId} = useSelector(getSelectedParentArea);

  useEffect(() => {
    // сбросим текущее значение
    dispatch(onResetAreaAction());
    // выберем данные из апи
    fetchGameArea((data: any)=>{
      dispatch(onAreaFetchedAction(data, parentId));
    });
  }, [parentId]);


  //console.log('SelectArea render', `parentId:${parentId}` ,`id:${id}`, `name:"${name}"`, `needResetViewValue:${needResetViewValue}`);

  return (
    <SelectComponent
      selectedId={id}
      selectedName={name}
      fullListToSelect={fullAreaListToSelect}
      onSelectAreaAction = {onSelectAreaAction}
      placeholder = {"select area"}
      needResetViewValue = {needResetViewValue}
      onResetViewValueAction = {onResetViewValueAction}
    />
  )
}