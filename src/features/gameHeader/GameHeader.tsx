import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';

import SelectParentArea from '../selectParentArea/selectParentArea';
import SelectArea from '../selectArea/selectArea';

import './GameHeader.scss';

export default function GameHeader(){

  return (
    <section className="game-header-container">
      <SelectParentArea/>
      <SelectArea/>
    </section>
  )
}