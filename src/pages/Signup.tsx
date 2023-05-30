import { useState, ChangeEvent, FormEvent } from 'react';

import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/actions/userSlice';

import './styles/Signup.css';

export default function Signup() {
    const [userName, setUserName] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleUserNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setUserName(event.target.value);
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(setUser(userName));
        navigate('/main');
    };

    const isUserNameEmpty = userName === '';

    return (
        <div className='signup-container'>
            <div className="signup-modal">
                <div className="signup-content">
                    <h2>Welcome to CodeLeap network!</h2>
                    <p>Please enter your username</p>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Type Your Username"
                            value={userName}
                            onChange={handleUserNameChange}
                        />
                        <button
                            type="submit"
                            disabled={isUserNameEmpty}
                            className={isUserNameEmpty ? 'disabled-button' : ''}
                        >
                            ENTER
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

