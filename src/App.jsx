import './App.css';
import { Message } from './components/Message/Message';
import { useEffect, useState } from "react"

export const App = () => {
  const [messageList, setMessageList] = useState([])

  const data = [
    {
      id: 1,
      text: "text1",
      author: "author-1"
    },
    {
      id: 2,
      text: "text2",
      author: "author-2"
    }
  ]

  useEffect(() => {
    setMessageList(data)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="App">
      <Message setMessageList={setMessageList} />
      {messageList.map((e,i) => <div key={i}>
        <p>{e.id}. {e.author}: "{e.text}"</p>
        <hr/>
      </div>)}
    </div>
  );
}
