import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { useCallback } from "react";
import { toggleShowName } from "../redux/profile/actions";

export const Profile = () => {
    const { showName, name } = useSelector((state) => state);
    const dispatch = useDispatch();

    const setShowName = useCallback(() => {
        dispatch(toggleShowName);
    }, [dispatch]);

    return (
        <div>
            <h1>Profile</h1>
            <input
                type="checkbox"
                id="showNameCheckbox"
                checked={showName}
                value={showName}
                onChange={setShowName}
            />
            <label htmlFor="showNameCheckbox">Show Name</label>
            {showName && <div>{name}</div>}
        </div>
    )
}
