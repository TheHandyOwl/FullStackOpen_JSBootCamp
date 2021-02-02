import './App.css';
import Message from './Message';

// Esta forma de declarar el componente, y el componente en forma de función son equivalentes

const  Description = () => {
    return (
        <p>Lorem ipsum dolor sit amet.</p>
    )
}

function App() {
    return (
        <div className = "App">
            <Message color='red' message='Hola Mundo!' />
            <Message color='yellow' message='Haciendo pruebas desde React!' />
            <Message color='green' message='Para todo el mundo' />
            <Description />
        </div>
    );
}

export default App;