import { useState, useEffect, useRef } from "react";
import Confetti from 'react-confetti';
import Die from "./components/Die";
import "./App.css"

export default function App() {
  const [dice, setDice] = useState(rollDie);
  const rollBtnRef = useRef(null);

  function rollDie() {
    return new Array(10)
        .fill(null)
        .map(() => ({
            value: Math.ceil(Math.random() * 6), 
            isHeld: false
        }));
}

const gameWon = dice.every(item => item.value === dice[0].value) && dice.every(item => item.isHeld);

useEffect(() => {
  if (gameWon) {
    rollBtnRef.current.focus();
  }
}, [dice])

  function handleRoll () {
    if (gameWon) {
      setDice(rollDie());
    } else {
      setDice(prevDice => 
        prevDice.map(item => 
            item.isHeld ? item : { ...item, value: Math.ceil(Math.random() * 6) }
        )
      ); 
    }
  }

  function holdDie(id) {
    setDice(prevDice => 
        prevDice.map((item, index) => (
          {
            ...item,
            isHeld: index === id ? !item.isHeld : item.isHeld
          }
        ))
      )   
  }

  const dieElements = dice.map((item, index) => (
    <Die 
      key={index + 1} 
      id={index} 
      value={item.value} 
      heldState={item.isHeld}
      holdDie={holdDie}
    />
  ));
  
  return (
    <>
      {gameWon && <Confetti/>}
      <h1 className="heading">Tenzies</h1>
      <p className="game-info">Roll until the dice are the same. Click each die to freeze it at its current value between rolls</p>
      <div className="die-container">
        {dieElements}
      </div>
      <button ref={rollBtnRef} className="roll-die" onClick={handleRoll}>{gameWon ? "New Game" : "Roll"}</button>
    </>
  )
}