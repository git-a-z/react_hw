import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';

import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { logOut } from '../services/firebase';

export const NavBar = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logOut();
        navigate('/signin');
    }

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
                    <Button color="inherit">
                        <Link className="TabBar" to={'/articles'}>Articles</Link>
                    </Button>
                    <Button color="inherit">
                        <Link className="TabBar" to={'/signin'}>Sign in</Link>
                    </Button>
                    <Button color="inherit">
                        <Link className="TabBar" to={'/signup'}>Sign up</Link>
                    </Button>
                    <Button color="inherit">
                        <Link className="TabBar" onClick={handleLogout}>Log out</Link>
                    </Button>
                </Toolbar>
            </AppBar>
        </Box>
    )
}
