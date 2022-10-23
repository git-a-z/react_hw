import style from './Message.module.css'
import { useEffect, useState, useRef } from "react"
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import SendIcon from '@mui/icons-material/Send'
import ListItemIcon from '@mui/material/ListItemIcon';

export const Message = ({ props }) => {
    const [text, setValue] = useState("some text")
    const [author, setAuthor] = useState(0)
    const arrOptions = ['You', props.chatList[props.chatId].penpal]
    const inputRef = useRef(null)
    const [lastMessage, setLastMessage] = useState("")

    const options = arrOptions.map((text, index) => {
        return <MenuItem key={index} value={index}>{text}</MenuItem>
    })

    useEffect(() => {
        setAuthor((author + 1) % arrOptions.length)
        inputRef.current?.focus()
        console.log("useEffect")
        props.setState({ key: Math.random() })

        if (lastMessage !== "") {
            setTimeout(() => {
                console.log(lastMessage.author + " wrote: " + lastMessage.text)
            }, 500)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lastMessage])

    return (
        <div className={style.message}>
            <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Author</InputLabel>
                    <Select value={author} onChange={(e) => setAuthor(e.target.value)} label="Author">
                        {options}
                    </Select>
                </FormControl>
            </Box>

            <Box sx={{ minWidth: 120 }}>
                <TextField inputRef={inputRef} value={text} onChange={(e) => setValue(e.target.value)}
                    label="Message" />
            </Box>

            <Button variant="contained"
                onClick={() => {
                    props.setChatList((prevstate) => {
                        const obj = {
                            id: prevstate[props.chatId].messages.length + 1,
                            text: text,
                            author: arrOptions[author]
                        }
                        setLastMessage(obj)
                        prevstate[props.chatId].messages = [...prevstate[props.chatId].messages, obj]
                        return prevstate
                    })
                }}>
                <ListItemIcon>
                    <SendIcon className="Text" />
                </ListItemIcon>
                Send
            </Button>
        </div>
    )
}
