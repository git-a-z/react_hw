import '../App.css';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import StarIcon from '@mui/icons-material/Star';
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { useCallback, useState } from "react";
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

import * as actions from '../redux/chats/actions';
import * as actionsMessages from '../redux/messages/actions';
import { AUTHORS } from '../components/Message/Authors';
import { Message } from '../components/Message/Message';
import { getChatList } from "../redux/chats/selectors";
import { getMessageList } from "../redux/messages/selectors";
import { getProfileName } from "../redux/profile/selectors";

export const Chats = () => {
    const chatList = useSelector(getChatList, shallowEqual);
    const messageList = useSelector(getMessageList, shallowEqual);
    const profileName = useSelector(getProfileName, shallowEqual);
    const dispatch = useDispatch();
    const { chatId } = useParams();
    const [value, setValue] = useState('New');

    const style = {
        width: '100%',
        bgcolor: 'background.paper',
    };

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
        dispatch(actions.addChat(value));
    }, [dispatch, value]);

    const deleteChat = useCallback((chatId) => () => {
        dispatch(actions.deleteChat(chatId));
        dispatch(actionsMessages.deleteChatMessages(chatId));
    }, [dispatch]);

    return (
        <div className="App">
            <ThemeProvider theme={theme}>
                <h1>Chats</h1>
                <div className="ListBox">
                    <div className="ListBoxLeft">
                        {chatList.map((e, id) => <div key={id}>
                            <List sx={style} component="nav" aria-label="mailbox folders">
                                <div className='LinkBox'>
                                    <Link to={`${e.id}`}>
                                        <ListItemButton>
                                            <ListItemIcon>
                                                <StarIcon color="primary" />
                                            </ListItemIcon>
                                            <ListItemText sx={style} className="ChatTitle" primary={e.name + ' with ' + e.penpal} />
                                        </ListItemButton>
                                    </Link>
                                    <div className='PointerTag' onClick={deleteChat(e.id)}>❌</div>
                                </div>
                            </List>
                        </div>)}
                        <div className='InputBox'>
                            <div className='EmptySpace'></div>
                            <Box>
                                <TextField value={value} onChange={handleChange}
                                    label="New chat penpal" />
                            </Box>
                            <div className='EmptySpace'></div>
                            <Button variant="contained"
                                onClick={addChat}>
                                +
                            </Button>
                        </div>
                    </div>
                    <div className="ListBoxRight">
                        {(chatId && chatList[chatId])
                            ? <><Message props={{ chatId }} />
                                {UpdateMessages(messageList, chatId, style, profileName)}</>
                            : <h4 className="LeftText">Select chat...</h4>}
                    </div>
                </div>
            </ThemeProvider >
        </div >
    );
}

const UpdateMessages = (messageList, chatId, style, profileName) => {
    return [...messageList[chatId] || []].reverse().map((e, i) =>
        <div key={i}>
            <List sx={style} component="nav" aria-label="mailbox folders">
                <ListItem button divider>
                    <ListItemText primary={(e.id + 1) + '. '
                        + (e.author === AUTHORS.ME ? profileName : e.author)
                        + ': «' + e.text + '»'} />
                </ListItem>
            </List>
        </div>);
}
