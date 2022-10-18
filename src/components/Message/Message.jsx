import style from './Message.module.css'
import { useState } from "react"

export const Message = ({setMessageList}) => {
    const [value, setValue] = useState("");
  
    return (
      <div className={style.message}>
        <input 
          type="text"
          value={value}
          onChange={(ev) => {
            setValue(ev.target.value);
          }}
        />
  
        <button
          onClick={() => {
            setMessageList((prevstate) => {
                let count = prevstate.length + 1
                setTimeout(() => console.log("author-" + count + " wrote: " + value), 1500)             

                return [...prevstate, {
                    id: count,
                    text: value,
                    author: "author-" + (count)
                }]
            });            
          }}>
          Добавить сообщение
        </button>
      </div>
    );
  };