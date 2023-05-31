import { ChangeEvent, FormEvent } from 'react';
import './styles/EditModal.css'

type EditModalProps = {
    title: string;
    message: string;
    onTitleChange: (event: ChangeEvent<HTMLInputElement>) => void;
    onMessageChange: (event: ChangeEvent<HTMLInputElement>) => void;
    onCancel: () => void;
    onSave: (event: FormEvent<HTMLFormElement>) => void;
  };

export default function EditModal({ title, message, onTitleChange, onMessageChange, onCancel, onSave }: EditModalProps) {
    return (
        <div className='modal-background'>
        <div className='modal-container'>
          <div className='modal-content'>
            <form onSubmit={onSave}>
              <h2>Edit item</h2>
              <div className='modal-title'>
                <p>Title</p>
                <input
                  type='text'
                  placeholder='Edit Your Title'
                  value={title}
                  onChange={onTitleChange}
                />
              </div>
              <div className="modal-message">
                <p>Content</p>
                <input
                  type='text'
                  placeholder='Your Message Here'
                  value={message}
                  onChange={onMessageChange}
                />
              </div>
              <div className='modal-buttons'>
                <button className='cancel-button' onClick={onCancel}>Cancel</button>
                <button className='save-button' type='submit'>Save</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
};


