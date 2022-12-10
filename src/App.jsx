import './App.css';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
    BrowserRouter,
    Routes,
    Route,
} from 'react-router-dom';

import { firebaseAuth } from './services/firebase';
import { NavBar } from './components/NavBar';
import { Home } from './pages/Home';
import { Chats } from './pages/Chats';
import { Profile } from './pages/Profile';
import { NotFound } from './pages/NotFound';
import { Articles } from './pages/Articles';
import { Signin } from './pages/Signin'
import { Signup } from './pages/Signup'
import { PrivateRoutes } from './components/routes/PrivateRoutes'
import * as profileActions from './redux/profile/actions'

export const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const unsubscribe = firebaseAuth.onAuthStateChanged((user) => {
            if (user) {
                dispatch(profileActions.auth(true))
            } else {
                dispatch(profileActions.auth(false))
            }
        })

        return unsubscribe
    }, [dispatch])

    return (
        <div className='App'>
            <BrowserRouter>
                <NavBar />
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='chats' element={<Chats />}>
                        <Route path=':chatId' element={<Chats />} />
                    </Route>
                    {/* <Route path='profile' element={<Profile />} /> */}
                    <Route
                        path="profile"
                        element={<PrivateRoutes component={<Profile />} />}
                    />
                    <Route path='articles' element={<Articles />} />
                    <Route path="signin" element={<Signin />} />
                    <Route path="signup" element={<Signup />} />
                    <Route path='*' element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}
