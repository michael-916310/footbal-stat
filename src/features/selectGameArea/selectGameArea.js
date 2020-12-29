import React, {useState} from 'react';

export default function SelectGameArea(props){

  let [viewValue, setViewValue] = useState('');


  function handleViewValueChange(e){
    const v = e.target.value;
    setViewValue(v);
  }

  return (
    <React.Fragment>
      <input type="text" className="select-component__view-value" placeholder="select parent area" value={viewValue} onChange={handleViewValueChange}/>
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