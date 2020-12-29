import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';

import SelectParentArea from '../selectParentArea/selectParentArea';

import './GameHeader.scss';

export default function GameHeader(){

  return (
    <section>
      <div>
        <SelectParentArea/>
      </div>
    </section>
  )
}