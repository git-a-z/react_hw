import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

export const PrivateRoutes = ({ component }) => {
    const { isAuth } = useSelector((store) => store.profile)

    if (isAuth) {
        // return <Navigate to="/signin" />
    }

    return component ? component : <Outlet />
}