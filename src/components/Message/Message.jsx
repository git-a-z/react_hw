import style from './Message.module.css';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import ListItemIcon from '@mui/material/ListItemIcon';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField';

import { useEffect, useState, useRef, useCallback } from "react";
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

import * as actions from '../../redux/messages/actions';
import { AUTHORS } from './Authors';
import { getChatList } from "../../redux/chats/selectors";

export const Message = ({ props }) => {
    const chatId = props.chatId;
    const chatList = useSelector(getChatList, shallowEqual);
    const dispatch = useDispatch();
    const [text, setText] = useState("some text");
    const [author, setAuthor] = useState(0);
    const arrOptions = [AUTHORS.ME, chatList[chatId].penpal];
    const inputRef = useRef(null);

    const options = arrOptions.map((text, index) => {
        return <MenuItem key={index} value={index}>{text}</MenuItem>;
    })

    useEffect(() => {
        inputRef.current?.focus();
        console.log("Message. useEffect");
    }, [author]);

    const addMessage = useCallback((chatId, text, authorIndex, arrOptions) => () => {
        dispatch(actions.addMessage(chatId, text, arrOptions[authorIndex]));
        setAuthor((authorIndex + 1) % arrOptions.length);
    }, [dispatch]);

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
                <TextField inputRef={inputRef} value={text} onChange={(e) => setText(e.target.value)}
                    label="Message" />
            </Box>

            <Button variant="contained"
                onClick={addMessage(chatId, text, author, arrOptions)}>
                <ListItemIcon>
                    <SendIcon className="Text" />
                </ListItemIcon>
                Send
            </Button>
        </div>
    )
}
