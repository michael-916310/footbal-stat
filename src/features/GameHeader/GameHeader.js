import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {fetchGameArea} from '../../app/api';
import SelectParentArea from '../selectParentArea/selectParentArea';
import {parentAreaFetched} from '../selectParentArea/parentAreaSlice';

import './GameHeader.scss';

export default function GameHeader(){

  const dispatch = useDispatch();

  useEffect(() => {
    fetchGameArea((data)=>{
      dispatch(parentAreaFetched(data));
    });
  }, []);

  return (
    <section>
      <div>
        <SelectParentArea/>
      </div>
    </section>
  )
}