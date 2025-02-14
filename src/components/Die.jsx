import React from 'react'

export default function Die(props) {
  return (
    <button 
      onClick={() => props.holdDie(props.id)}
      style={{backgroundColor: props.heldState ? "#349e34" : "white"}}
    >{props.value}
    </button>
  )
}
