import logo from './logo.svg';
import './App.css';
import { Form } from './components/Form/Form';
import { Count } from './components/Count/Count';
import { Message } from './components/Message/Message';
import { useState } from "react"

export const App = () => {
  const [name, setName] = useState("Geek")  
  const [text, setText] = useState("Text")

  const handleChangeName = (ev) => {
    setName(ev.target.value)
  }

  const handleChangeText = (ev) => {
    setText(ev.target.value)
  }

  return (
    <div className="App">      
      <Message text={text}/>
      <input onChange={handleChangeText} value={text}/>
      <hr/>      
      <Count name={name}/>
      <input onChange={handleChangeName} value={name}/>
      <hr/>      
      <Form/>
      
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
    </div>
  );
}
