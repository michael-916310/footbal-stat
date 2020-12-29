import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {selectId, selectName} from './parentAreaSlice';

export default function SelectParentArea(props){

  let [viewValue, setViewValue] = useState('');

  const areaId = useSelector(selectId);
  const areaName = useSelector(selectName);


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
      {`areaId:<${areaId}>`}
      {`areaName:<${areaName}>`}
      {
      (viewValue &&
        <div>
          <div>
            <label><input name="selectValue" type="radio"/>описание 1</label>
          </div>
          <div>
            <label><input name="selectValue" type="radio"/>описание 2</label>
          </div>
      </div>)
      }
    </React.Fragment>
  )
}