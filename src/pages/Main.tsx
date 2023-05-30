import { ChangeEvent, FormEvent, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux';
import image from '/user.png';

import './styles/Main.css';

export default function Main() {
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');

    const user = useSelector((state: RootState) => state.user.value);

    const isFormInvalid = !title || !message;

    const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };

    const handleMessageChange = (event: ChangeEvent<HTMLInputElement>) => {
        setMessage(event.target.value);
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
    };

    return (
        <div className="main-container">
            <div className="main-content">
                <div className="main-header">
                    <h2>CodeLeap Network</h2>
                    <div className="main-user">
                        <p>Olá, {user}</p>
                        <img src={image}></img>
                    </div>
                </div>
                <div className="main-poster">
                    <div className='poster-content'>
                        <form onSubmit={handleSubmit}>
                            <h2>What's on your mind?</h2>
                            <div className="poster-title">
                                <p>Title</p>
                                <input
                                    type='text'
                                    placeholder='Type Your Title'
                                    value={title}
                                    onChange={handleTitleChange}
                                />
                            </div>
                            <div className="poster-message">
                                <p>Content</p>
                                <input
                                    type='text'
                                    placeholder='Your Message Here'
                                    value={message}
                                    onChange={handleMessageChange}
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={isFormInvalid}
                                className={isFormInvalid ? 'disabled-button' : ''}
                            >
                                Create
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
