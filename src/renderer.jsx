import { createRoot } from 'react-dom/client';
import './index.css';
import Hello from './Components/Hello';

const App = () =>{
    return (
        <>
        <Hello/>
        </>
    )
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App/>);