const EditModal = ({
  editingItem,
  setEditingItem,
  setShowEdit,
  updateItem,
}) => {
  return (
    <div className="delete-modal">
      <div className="modal-inner">
        <h5 className="text-center">Edit Book Name</h5>
        <input
          // elemanın düzenlenmiş ismini app js teki state'e gönderme
          onChange={(e) =>
            setEditingItem({
              ...editingItem,
              title: e.target.value,
              date: new Date(),
            })
          }
          value={editingItem.title}
          className="form-control mb-4 shadow"
          type="text"
        />
        <div className="d-flex justify-content-between ">
          <button
            onClick={() => setShowEdit(false)}
            className="btn btn-secondary"
          >
            Cancel
          </button>
          <button onClick={() => updateItem()} className="btn btn-success">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
