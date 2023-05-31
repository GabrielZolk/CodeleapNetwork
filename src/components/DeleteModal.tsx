import './styles/DeleteModal.css'

type DeleteModalProps = {
    onCancel: () => void;
    onConfirm: () => void;
};

export default function DeleteModal(props: DeleteModalProps) {
    return (
        <div className="modal-background">
            <div className="modal-container">
                <div className="modal-content">
                    <h2>Confirm Delete</h2>
                    <p>Are you sure you want to delete this post?</p>
                    <div className="modal-buttons">
                        <button className="cancel-button" onClick={props.onCancel}>
                            Cancel
                        </button>
                        <button className="delete-button" onClick={props.onConfirm}>
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};


