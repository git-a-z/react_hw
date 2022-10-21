import './App.css'
import { Message } from './components/Message/Message'
import { useEffect, useState } from "react"
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemButton from '@mui/material/ListItemButton'
import StarIcon from '@mui/icons-material/Star'
import { createTheme, ThemeProvider } from '@mui/material/styles'

export const App = () => {
  const [messageList, setMessageList] = useState([])
  const [chatList, setChatList] = useState([])
  const dataMessages = [
    {
      id: 1,
      text: "text 1",
      author: "Author 1"
    }
  ]
  const dataChats = [{
      id: "1",
      name: "Chat 1"
    },
    {
      id: "2",
      name: "Chat 2"
    }]
  const style = {
    width: '100%',
    bgcolor: 'background.paper',
  }
  const theme = createTheme({
    palette: {
      primary: {
        main: "#1976d2",
      },
      secondary: {
        main: "#03a9f4",
      },
    },
  })

  useEffect(() => {
    setMessageList(dataMessages)
    setChatList(dataChats)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Message setMessageList={setMessageList} />
        <div className="ListBox">
          <div className="ListBoxLeft">
            {chatList.map((e,i) => <div key={i}>
              <List sx={style} component="nav" aria-label="mailbox folders">
                <ListItemButton divider>
                  <ListItemIcon>
                    <StarIcon />
                  </ListItemIcon>
                  <p>{e.id}. {e.name}</p>
                </ListItemButton>
              </List>
            </div>)}
          </div>
          <div className="ListBoxRight">
            {[...messageList].reverse().map((e,i) => <div key={i}>
              <List sx={style} component="nav" aria-label="mailbox folders">
                <ListItem button divider>
                  <p>{e.id}. {e.author}: "{e.text}"</p>
                </ListItem>
              </List>
            </div>)}
          </div>
        </div>
      </ThemeProvider>
    </div>    
  )
}
