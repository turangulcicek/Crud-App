const BookCard = ({
  data,
  handleModal,
  handleRead,
  handleEditModal,
  editBackground,
}) => {
  return (
    <div
      className={`d-flex justify-content-between  shadow p-3 align-items-center rounded-1 mb-3 ${
        editBackground ? "bg-light" : "bg-secondary text-light"
      }`}
    >
      <div>
        <h5 className={data.isRead ? "text-decoration-line-through" : ""}>
          {data.title}
        </h5>
        <p>{new Date(data.date).toLocaleString()}</p>
      </div>
      <div className="btn btn-group">
        <button onClick={() => handleModal(data.id)} className="btn btn-danger">
          Delete
        </button>
        <button
          onClick={() => handleEditModal(data)}
          className="btn btn-warning"
        >
          Edit
        </button>
        <button onClick={() => handleRead(data)} className="btn btn-success">
          {data.isRead ? "Read" : "Unread"}
        </button>
      </div>
    </div>
  );
};

export default BookCard;
