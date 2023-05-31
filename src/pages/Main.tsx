import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux';
import image from '/user.png';

import './styles/Main.css';
import Post from '../components/Post';
import api from '../services/api';

export default function Main() {
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    const [post, setPost] = useState<any[]>([]);

    const user = useSelector((state: RootState) => state.user.value);

    const isFormInvalid = !title || !message;

    const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };

    const handleMessageChange = (event: ChangeEvent<HTMLInputElement>) => {
        setMessage(event.target.value);
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            await api.post("/careers/", {
                username: user,
                title: title,
                content: message
            });

            setTitle("");
            setMessage("");

            getPostData();
        } catch (error) {
            console.error(error);
        }
    };



    async function getPostData() {
        const { data } = await api.get("/careers/?limit=10");

        if (data) {
            const fullData = await Promise.all(
                data.results.map(async (item: any) => {
                    return {
                        id: Number(item.id),
                        username: item.username,
                        created_datetime: item.created_datetime,
                        title: item.title,
                        content: item.content
                    };
                })
            );
            setPost(fullData);
        }
    }

    useEffect(() => {
        getPostData();
    }, [])

    return (
        <>
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
                                <div className='main-button'>
                                    <button
                                        type="submit"
                                        disabled={isFormInvalid}
                                        className={isFormInvalid ? 'disabled-button' : ''}
                                    >
                                        Create
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div>

                        {post.map((post, index) => (
                            <Post
                                key={index}
                                id={post.id}
                                username={post.username}
                                created_date={post.created_datetime}
                                title={post.title}
                                content={post.content}
                                getPostData={getPostData}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
