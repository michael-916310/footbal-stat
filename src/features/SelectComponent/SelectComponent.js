import React, {useState} from 'react';

export default function SelectComponent(props){

  let [selectedValue, setSelectedValue] = useState(-1);
  let [viewValue, setViewValue] = useState('');

  function showListToSelect(){

  }

  function onViewValueChange(e){
    const v = e.target.value;
    if (v) {
      setViewValue(`${viewValue}${v}`);
      console.log(v);
      showListToSelect();

    }
  }

  return (
    <React.Fragment>
      <input type="text" className="select-component__view-value" placeholder="select parent area" value={viewValue} onChange={onViewValueChange}/>
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