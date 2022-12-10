import '../App.css';
import { style } from './style';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import StarIcon from '@mui/icons-material/Star';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { useCallback, useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { push, remove, onValue } from "firebase/database";

import * as actions from '../redux/chats/actions';
import * as actionsMessages from '../redux/messages/actions';
import { AUTHORS } from '../components/Message/Authors';
import { Message } from '../components/Message/Message';
// import { getChatList } from '../redux/chats/selectors';
// import { getMessageList } from '../redux/messages/selectors';
import { getProfileName } from '../redux/profile/selectors';
import { MyButton } from '../components/Button/Button';
import { MyTextField } from '../components/TextField/TextField';
import { chatsRef, getChatById, messagesRef } from '../services/firebase';

export const Chats = () => {
    const { chatId } = useParams();
    // const chatList = useSelector(getChatList, shallowEqual);
    const [chatList, setChatList] = useState({});
    // const messageList = useSelector(getMessageList, shallowEqual);
    const [messageList, setMessageList] = useState({});
    const curMessageList = [...messageList[chatId] || []];
    const messageListlength = curMessageList.length;
    const profileName = useSelector(getProfileName, shallowEqual);
    const dispatch = useDispatch();
    const [value, setValue] = useState('New');

    const theme = createTheme({
        palette: {
            primary: {
                main: "#1976d2",
            },
            secondary: {
                main: "#03a9f4",
            },
        },
    });

    const handleChange = useCallback((e) => {
        setValue(e.target.value);
    }, []);

    const addChat = useCallback(() => {
        const newChatId = Math.floor(Math.random() * 1000);
        dispatch(actions.addChat(value, newChatId));
        push(chatsRef, {
            id: newChatId,
            name: 'Chat',
            penpal: value,
        })
    }, [dispatch, value]);

    useEffect(() => {
        onValue(chatsRef, (snapshot) => {
            const data = snapshot.val()
            const newChatList = {};
            for (var key in data) {
                data[key].key = key;
                newChatList[data[key].id] = data[key];
            }
            setChatList(newChatList);
        })
    }, []);

    useEffect(() => {
        onValue(messagesRef, (snapshot) => {
            const data = snapshot.val();
            let newMessageList = {};
            for (var key in data) {
                let message = data[key];
                let currentMessageList = [];
                if (newMessageList[message.chatId]) {
                    currentMessageList = newMessageList[message.chatId];
                }
                newMessageList = {
                    ...newMessageList,
                    [message.chatId]: [
                        ...currentMessageList,
                        { ...message },
                    ],
                };
            }
            setMessageList(newMessageList);
        })
    }, []);

    const deleteChat = useCallback((chatId, key) => () => {
        remove(getChatById(key));
        dispatch(actions.deleteChat(chatId));
        dispatch(actionsMessages.deleteChatMessages(chatId));
    }, [dispatch]);

    return (
        <div className="App">
            <ThemeProvider theme={theme}>
                <h1>Chats</h1>
                <div className="ListBox">
                    <div className="ListBoxLeft">
                        {Object.entries(chatList)
                            .sort((a, b) => a[1].penpal > b[1].penpal ? 1 : -1)
                            .map(([id, e]) =>
                                <div key={id}>
                                    <List sx={style} component="nav" aria-label="mailbox folders">
                                        <div className='LinkBox'>
                                            <Link to={`${id}`}>
                                                <ListItemButton>
                                                    <ListItemIcon>
                                                        <StarIcon color="primary" />
                                                    </ListItemIcon>
                                                    <ListItemText sx={style} className="ChatTitle" primary={e.name + ' with ' + e.penpal} />
                                                </ListItemButton>
                                            </Link>
                                            <div className='PointerTag' onClick={deleteChat(e.id, e.key)}>❌</div>
                                        </div>
                                    </List>
                                </div>
                            )
                        }
                        <div className='InputBox'>
                            <div className='EmptySpace'></div>
                            <MyTextField value={value} onChange={handleChange}
                                label="New chat penpal">
                            </MyTextField>
                            <div className='EmptySpace'></div>
                            <MyButton onClick={addChat}>
                                +
                            </MyButton>
                        </div>
                    </div>
                    <div className="ListBoxRight">
                        {(chatId && chatList[chatId])
                            ? <><Message messageListlength={messageListlength} />
                                {UpdateMessages(curMessageList, style, profileName)}</>
                            : <h4 className="LeftText">Select chat...</h4>
                        }
                    </div>
                </div>
            </ThemeProvider >
        </div >
    );
}

const UpdateMessages = (curMessageList, style, profileName) => {
    return (
        <List sx={style} component="nav" aria-label="mailbox folders">
            {curMessageList.reverse().map((e, i) =>
                <div key={i}>
                    <ListItem button divider>
                        <ListItemText primary={(e.id + 1) + '. '
                            + (e.author === AUTHORS.ME ? profileName : e.author)
                            + ': «' + e.text + '»'} />
                    </ListItem>
                </div>)
            }
        </List>)
}
