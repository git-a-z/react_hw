import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';

import { Link } from "react-router-dom";

export const NavBar = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar className="Toolbar">
                    <Button color="inherit">
                        <Link className="TabBar" to={'/'}>Home</Link>
                    </Button>
                    <Button color="inherit">
                        <Link className="TabBar" to={'/chats'}>Chats</Link>
                    </Button>
                    <Button color="inherit">
                        <Link className="TabBar" to={'/profile'}>Profile</Link>
                    </Button>
                </Toolbar>
            </AppBar>
        </Box>
    )
}
