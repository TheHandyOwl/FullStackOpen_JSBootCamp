import { useState } from 'react'
import './App.css'

function App() {
  const [contador, setContador] = useState(0)
  // Atomizado
  //const [left, setLeft] = useState(0)
  //const [right, setRight] = useState(0)
  // Sin atomizar
  const [movement, setMovement] = useState({
    left: 0,
    right: 0,
    mensajeDeEstado: "Este mensaje no debería desaparecer."
  })
  const [clicks, setClicks] = useState([])

  // Warning
  const Warning = () => {
    return <h3>Clicks no se utiliza</h3>
  }

  // Counter
  const Counter = ({number}) => {
    console.log("Esto también se ejecuta")
    return (
      <h2>{ number }</h2>
    )
  }

  const handleClick = ({inc}) => {
    setContador( prevContador => inc ? prevContador + 1 : prevContador - 1 )
  }

  const handleClickReset = () => {
    setContador( 0 )
  }

  // Left and Right
  const handleClickLeft = () => {
    //setLeft( prevLeft => prevLeft + 1 )
    const newMovementState = {
      ...movement,
      left: movement.left + 1
    }
    setMovement(newMovementState)
    setClicks( prevClicks => ([...prevClicks, 'L']) )
  }

  const handleClickRight = () => {
    //setRight( prevRight => prevRight + 1 )
    const newMovementState = {
      ...movement,
      right: movement.right + 1
    }
    setMovement(newMovementState)
    setClicks( prevClicks => ([...prevClicks, 'R']) )
  }

  const handleClickResetLeftRight = () => {
    // setLeft(0)
    // setRight(0)
    const newMovementState = {
      ...movement,
      right: 0,
      left: 0
    }
    setMovement(newMovementState)
    setClicks([])
  }

  const contadorEsPar = contador % 2 === 0 ? "par" : "impar"
  
  console.log("render")
  
  return (
    <div>
      <div>
        <h1>El valor del contador es { contadorEsPar }</h1>
        <Counter number={contador} />
        <button onClick={ () => handleClick({inc: false}) } >Decrement!</button>
        <button onClick={ handleClickReset }>Reset</button>
        <button onClick={ () => handleClick({inc: true}) } >Increment!</button>
      </div>
      <div>
        <h1>Derecha e izquierda</h1>
        {movement.left}
        <button onClick={ () => handleClickLeft() } >LEFT</button>
        <button onClick={ () => handleClickResetLeftRight() } >RESET</button>
        <button onClick={ () => handleClickRight() } >RIGHT</button>
        {movement.right}
        <p>Clicks totales: {clicks.length}</p>
        <p>{movement.mensajeDeEstado}</p>
        <p>Pulsaciones: {clicks}</p>
        <p>Pulsaciones: {clicks.join(", ")}</p>
        { clicks.length === 0 ? (<Warning />) : (clicks.length) }
      </div>
    </div>
  );
}

export default App;
