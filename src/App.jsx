import './App.css';
import {
    BrowserRouter,
    Routes,
    Route,
} from 'react-router-dom';
import { NavBar } from './components/NavBar';
import { Home } from './pages/Home';
import { Chats } from './pages/Chats';
import { Profile } from './pages/Profile';
import { NotFound } from './pages/NotFound';

export const App = () => {
    return (
        <div className='App'>
            <BrowserRouter>
                <NavBar />
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='chats' element={<Chats />}>
                        <Route path=':chatId' element={<Chats />} />
                    </Route>
                    <Route path='profile' element={<Profile />} />
                    <Route path='*' element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}
