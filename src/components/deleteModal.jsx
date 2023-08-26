const DeleteModal = (props) => {
  return (
    <div className="delete-modal">
      <div className="modal-inner d-flex flex-column gap-3 ">
        <h5>Do you want to delete</h5>
        <button
          onClick={() => props.setShowDelete(false)}
          className="btn btn-secondary"
        >
          Cancel
        </button>
        <button onClick={() => props.handleDelete()} className="btn btn-danger">
          Confirm
        </button>
      </div>
    </div>
  );
};

export default DeleteModal;
