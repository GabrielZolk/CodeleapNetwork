import trash from '/trash.png';
import edit from '/edit.png';

import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux';

import './styles/Post.css'
import api from '../services/api';
import DeleteModal from '../components/DeleteModal';
import EditModal from './EditModal';

export type PostProps = {
  id: number;
  username: string;
  created_date: string;
  title: string;
  content: string;
  getPostData: () => void;
};

export default function Post(props: PostProps) {
  const [timeElapsed, setTimeElapsed] = useState<string>('');
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const currentUser = useSelector((state: RootState) => state.user.value);
  const canEditPost = props.username === currentUser;

  useEffect(() => {
    const postDate = new Date(props.created_date);
    const currentDate = new Date();
    const timeDiff = Math.floor((currentDate.getTime() - postDate.getTime()) / 60000);

    if (timeDiff < 60) {
      setTimeElapsed(`${timeDiff} minutes ago`);
    } else if (timeDiff < 1440) {
      const hours = Math.floor(timeDiff / 60);
      setTimeElapsed(`${hours}h ago`);
    } else {
      const days = Math.floor(timeDiff / 1440);
      setTimeElapsed(`${days} days ago`);
    }
  }, [props.created_date]);

  const handleDeletePost = async () => {
    try {
      await api.delete(`/careers/${props.id}/`);
      console.log('Post deleted successfully!');
      setShowDeleteModal(false);
      props.getPostData();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditPost = () => {
    setIsEditing(!isEditing);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await api.patch(`/careers/${props.id}/`, {
        title: title,
        content: message,
      });

      setTitle("");
      setMessage("");

      setIsEditing(false);

      props.getPostData();
    } catch (error) {
      console.error(error);
    }
  }

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleMessageChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const showDeleteConfirmationModal = () => {
    setShowDeleteModal(true);
  };

  const hideDeleteConfirmationModal = () => {
    setShowDeleteModal(false);
  };

  return (
    <>
      <div className="post-container">
        <div className="post-content">
          <div className="post-header">
            <p className="post-title">{props.title}</p>
            <div className="post-icons">
              {canEditPost && (
                <div className="icons">
                  <img src={trash} alt="Trash Icon" onClick={showDeleteConfirmationModal} className='trash' />
                  <img src={edit} alt="Edit Icon" onClick={handleEditPost} className='edit' />
                </div>
              )}
            </div>
          </div>
          <div className="post-info">
            <span className="post-user">@{props.username}</span>
            <span className="post-time">{timeElapsed}</span>
          </div>
          <div className="post-message">
            <p>{props.content}</p>
          </div>
        </div>
      </div>
      {isEditing && (
        <EditModal
          title={title}
          message={message}
          onTitleChange={handleTitleChange}
          onMessageChange={handleMessageChange}
          onCancel={() => setIsEditing(false)}
          onSave={handleSubmit}
        />
      )}
      {showDeleteModal && (
        <DeleteModal
          onCancel={hideDeleteConfirmationModal}
          onConfirm={handleDeletePost}
        />
      )}
    </>
  )
}
