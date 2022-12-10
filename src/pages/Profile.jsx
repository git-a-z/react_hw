import { useCallback, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

import * as actions from "../redux/profile/actions";
import { getProfileName } from '../redux/profile/selectors';
import { MyButton } from '../components/Button/Button';
import { MyTextField } from '../components/TextField/TextField';

export const Profile = () => {
    const profileName = useSelector(getProfileName, shallowEqual);
    const dispatch = useDispatch();
    const [value, setValue] = useState(profileName);

    const handleChange = useCallback((e) => {
        setValue(e.target.value);
    }, []);

    const setName = useCallback(() => {
        dispatch(actions.changeName(value));
    }, [dispatch, value]);

    return (
        <div>
            <h1>Profile</h1>
            <div className='InputBox'>
                <MyTextField value={value} onChange={handleChange}
                    label="Name">
                </MyTextField>
                <div className='EmptySpace'></div>
                <MyButton onClick={setName}>
                    Change Name
                </MyButton>
            </div>
        </div>
    )
}
