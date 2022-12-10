import style from './Message.module.css';
import MenuItem from '@mui/material/MenuItem';

import { useEffect, useState, useRef, useCallback } from 'react';
// import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { onValue, push } from "firebase/database";

import * as actions from '../../redux/messages/actions';
import { AUTHORS } from './Authors';
// import { getChatList } from '../../redux/chats/selectors';
import { MySendButton } from '../Button/Button';
import { MySelect } from '../Select/Select';
import { MyTextField } from '../TextField/TextField';
import { chatsRef, messagesRef } from '../../services/firebase';

export const Message = (props) => {
    const messageListlength = props.messageListlength;
    const { chatId } = useParams();
    // const chatList = useSelector(getChatList, shallowEqual);
    const [chatList, setChatList] = useState([]);
    const dispatch = useDispatch();
    const [text, setText] = useState("some text");
    const [author, setAuthor] = useState(0);
    const penpal = chatList[chatId] ? chatList[chatId].penpal : '';
    const arrOptions = [AUTHORS.ME, penpal];
    const inputRef = useRef(null);

    const options = arrOptions.map((text, index) => {
        return <MenuItem key={index} value={index}>{text}</MenuItem>;
    })

    useEffect(() => {
        inputRef.current?.focus();
    }, [author]);

    useEffect(() => {
        onValue(chatsRef, (snapshot) => {
            const data = snapshot.val()
            if (data) {
                const newChatList = {};
                for (var key in data) {
                    data[key].key = key;
                    newChatList[data[key].id] = data[key];
                }
                setChatList(newChatList);
            }
        })
    }, []);

    const addMessage = useCallback((chatId, text, authorIndex, arrOptions) => () => {
        const author = arrOptions[authorIndex];

        push(messagesRef, {
            chatId,
            id: messageListlength,
            text,
            author,
        })

        dispatch(actions.addMessageWithMiddleware(chatId, text, author));
        setAuthor((authorIndex + 1) % arrOptions.length);
    }, [dispatch, messageListlength]);

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
