import React, { useState } from 'react';
import GameHeader from '../gameHeader/GameHeader';

export default function GameContainer(props: any){
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