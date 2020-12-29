import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {parentAreaFetched} from '../selectParentArea/parentAreaSlice';
import {fetchGameArea} from '../../app/api';

import {selectedId, selectedName, listToSelect} from './parentAreaSlice';


export default function SelectParentArea(props){

  let [viewValue, setViewValue] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    fetchGameArea((data)=>{
      dispatch(parentAreaFetched(data));
    });
  }, []);

  const areaId = useSelector(selectedId);
  const areaName = useSelector(selectedName);
  const list = useSelector(listToSelect);


  function handleViewValueChange(e){
    const v = e.target.value;
    setViewValue(v);
  }

  return (
    <React.Fragment>
      <input
        type="text"
        className="select-component__view-value"
        placeholder="select parent area"
        value={viewValue}
        onChange={handleViewValueChange}
      />
      {(list &&
          <div>
            {
              list.map(el => {
                return (
                  <div>
                    <label><input name="selectValue" type="radio"/>{el.name}</label>
                  </div>
                )
              })
            }
          </div>
      )}
    </React.Fragment>
  )
}