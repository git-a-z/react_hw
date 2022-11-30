import style from './Message.module.css';
import MenuItem from '@mui/material/MenuItem';

import { useEffect, useState, useRef, useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

import * as actions from '../../redux/messages/actions';
import { AUTHORS } from './Authors';
import { getChatList } from '../../redux/chats/selectors';
import { MySendButton } from '../Button/Button';
import { MySelect } from '../Select/Select';
import { MyTextField } from '../TextField/TextField';

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
        dispatch(actions.addMessageWithMiddleware(chatId, text, arrOptions[authorIndex]));
        setAuthor((authorIndex + 1) % arrOptions.length);
    }, [dispatch]);

    return (
        <div className={style.message}>
            <MySelect value={author} onChange={(e) => setAuthor(e.target.value)} label='Author'>
                {options}
            </MySelect>

            <MyTextField inputRef={inputRef} value={text} onChange={(e) => setText(e.target.value)}
                label="Message">
            </MyTextField>

            <MySendButton onClick={addMessage(chatId, text, author, arrOptions)}>
                Send
            </MySendButton>
        </div>
    )
}
