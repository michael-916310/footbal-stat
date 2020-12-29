import React from 'react';
import SelectComponent from '../SelectComponent/SelectComponent';
import SelectGameArea from '../selectGameArea/selectGameArea';

import './GameHeader.scss';

export default function GameHeader(){
  return (
    <section>
      <div>
        <SelectGameArea/>
        <SelectComponent></SelectComponent>
      </div>
    </section>
  )
}