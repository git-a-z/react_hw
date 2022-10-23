import '../App.css'
import { Message } from '../components/Message/Message'
import { useEffect, useState } from "react"
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import StarIcon from '@mui/icons-material/Star'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { Link, useParams } from 'react-router-dom'

export const Chats = () => {
    const [chatList, setChatList] = useState([])
    const [state, setState] = useState(0)
    const { chatId } = useParams()
    const dataChats = [{
        id: 1,
        name: "Chat",
        penpal: "Alice",
        messages: [
            {
                id: 1,
                text: "Hello, hello, hello!",
                author: "Alice",
            },
            {
                id: 2,
                text: "Well, hello to you, too, Alice!",
                author: "You",
            },
        ]
    },
    {
        id: 2,
        name: "Chat",
        penpal: "Kate",
        messages: [
            {
                id: 1,
                text: "Hi!",
                author: "Kate",
            },
            {
                id: 2,
                text: "Wow! Long time no see!",
                author: "You",
            },
        ]
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
        setChatList(dataChats)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="App">
            <ThemeProvider theme={theme}>
                <h1>Chats</h1>
                <div className="ListBox">
                    <div className="ListBoxLeft">
                        {chatList.map((e, id) => <div key={id}>
                            <Link to={`${id}`}>
                                <List sx={style} component="nav" aria-label="mailbox folders">
                                    <ListItemButton divider>
                                        <ListItemIcon>
                                            <StarIcon color="primary" />
                                        </ListItemIcon>
                                        <ListItemText className="ChatTitle" primary={e.name + ' with ' + e.penpal} />
                                    </ListItemButton>
                                </List>
                            </Link>
                        </div>)}
                    </div>
                    <div className="ListBoxRight">
                        {(chatId && chatList[chatId]) ? <Message props={{ setChatList, setState, chatId, chatList, state }} /> : ""}
                        {(chatId && chatList[chatId])
                            ? UpdateMessages(chatList, chatId, style)
                            : <h4 className="LeftText">Select chat...</h4>}
                    </div>
                </div>
            </ThemeProvider>
        </div>
    )
}

const UpdateMessages = (chatList, chatId, style) => {
    return [...chatList[chatId].messages].reverse().map((e, i) =>
        <div key={i}>
            <List sx={style} component="nav" aria-label="mailbox folders">
                <ListItem button divider>
                    <ListItemText primary={e.id + '. ' + e.author + ': «' + e.text + '»'} />
                </ListItem>
            </List>
        </div>)
}
