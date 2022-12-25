import React from 'react'
import Button from '@mui/material/Button';
import ListItemIcon from '@mui/material/ListItemIcon';
import SendIcon from '@mui/icons-material/Send';

export function MyButton(props) {
    return (
        <Button variant="contained"
            {...props}>
            {props.children}
        </Button>
    )
}

export function MySendButton(props) {
    return (
        <Button variant="contained"
            {...props}>
            <ListItemIcon>
                <SendIcon className="Text" />
            </ListItemIcon>
            {props.children}
        </Button>
    )
}
