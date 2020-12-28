import React from 'react';
import './GameHeader.scss';

export default function GameHeader(){
  return (
    <section>
      <div>
        <input type="text" className="GameHeader__parent-area" placeholder="select parent area"/>
        <input type="text" className="GameHeader__area" placeholder="select area"/>
        <input type="text" className="GameHeader__year" placeholder="select year"/>
      </div>
    </section>
  )
}