import React, { useState } from 'react';
import GameHeader from '../GameHeader/GameHeader';

export default function GameContainer(props){
  return (
    <div>
      <div>
        <h1>header</h1>
        <GameHeader/>
      </div>
      <div>
        <h1>
        CompetitionList
        </h1>
      </div>
    </div>
  )
}