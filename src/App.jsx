import { v4 } from "uuid";
import { useState } from "react";
import BookCard from "./components/bookCard";
import DeleteModal from "./components/deleteModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditModal from "./components/editModal";

function App() {
  const [books, setBooks] = useState([]);
  // modal için use state tutacağız
  const [showDelete, setShowDelete] = useState(false);
  // silinecek elemanın id'sini tutma
  const [deleteId, setDeleteId] = useState(null);
  // Düzenlenecek elemanın state'i
  const [showEdit, setShowEdit] = useState(false);
  //
  const [editingItem, setEditingItem] = useState(null);

  // arka plan değiştirme

  const [editBackground, setEditBackground] = useState(false);

  // formun gönderilme olayı
  const handleSubmit = (e) => {
    e.preventDefault();
    // kitap ismine erişme
    const title = e.target[0].value;

    // eğer kitap ismi girilmzse alert bas
    if (!title) {
      toast.error("Please type a book name", { theme: "colored" });
      return; /* buraki return fonksiyonu durdurmak için  */
    }
    // kitap dizisi
    const newBook = {
      id: v4(),
      title,
      date: new Date(),
      isRead: false,
    };
    // oluşturulan objeyi kitap dizisine aktarma
    setBooks([newBook, ...books]);
    // inputu temizle
    e.target[0].value = "";
    // bildirim verme (Kitap eklendi)
    toast.success("Book has been attached", {
      theme: "colored",
      autoClose: 1000,
    });
  };

  // silme işlemini yapan fonk.
  const handleDelete = () => {
    // id'sini bildiğimiz elemanı diziden çıkarma
    const filtered = books.filter((book) => book.id !== deleteId);

    // state'i günceller
    setBooks(filtered);
    // modal'ı kapat
    setShowDelete(false);
    // toast bildirimi verme (react toast sayfasından alındı)
    toast.error("Book has been deleted", {
      theme: "colored",
      autoClose: 1000,
    });
  };

  // silme modal'ı için fonksiiyon

  const handleModal = (id) => {
    // modal'ı açar
    setShowDelete(true);
    // silinecek elemanın id'sini state'e aktarma
    setDeleteId(id);
  };

  // okundu işlemini yapar
  const handleRead = (editItem) => {
    /* 
     !dizideki bir elemanı güncelleme (1. yöntem) 
    )
    okundu değerini tersine çevirme
    
    state'in kopyasını alma
    const clone = [...books];
     düzenlenecek elemanın sırasını bulma
    const index = books.findIndex((book) => book.id === updated.id);
    clone dizisini güncelleme
    clone[index] = updated;
    state'i günceller
    setBooks(clone);
    */

    // ! 2. yöntem
    const updated = { ...editItem, isRead: !editItem.isRead };
    const newBooks = books.map((item) =>
      item.id !== updated.id ? item : updated
    );
    // state'i günceller
    setBooks(newBooks);
    console.log(books);
  };

  // Düzenleme yapacak fonk
  // edit modal işlemler
  const handleEditModal = (item) => {
    // modal'ı açar
    setShowEdit(true);
    // düzenlenecek elemanı state'e aktar
    setEditingItem(item);
  };

  // elemanı düzenleme fonk.
  const updateItem = () => {
    // kitaplar dizisini dön
    // eleman düzenlenecek eleman değilse onu olduğu gibi yeni diziye aktar
    // eleman düzenlenecek olansa güncel halini diziye aktar
    //
    const newBooks = books.map((book) =>
      book.id !== editingItem.id ? book : editingItem
    );

    // state'i  güncelleme
    setBooks(newBooks);
    // modal kapatma
    setShowEdit(false);

    // bildirim verme
    toast.info("Bookname edited ", { autoClose: 2000 });

    // background değiştirme
  };
  const handleBackground = () => {
    setEditBackground(!editBackground);
  };

  return (
    <div className={editBackground ? "App bg-dark" : "App bg-light"}>
      <header className="text-center p-2 bg-dark">
        <h1 className="text-light">Book Shelf</h1>
      </header>
      {/* form alanı */}
      <main className="container">
        <form onSubmit={handleSubmit} action="" className="d-flex gap-3 p-5">
          <input
            type="text"
            className="form-control  shadow"
            placeholder="Please type the book name"
          />
          <button className="btn btn-warning">Add</button>
        </form>

        {/* kitaplar dizisi boşsa  */}
        {books.length === 0 && (
          <h3 className="text-center text-warning">No book attached yet</h3>
        )}
        {/* kitaplar dizisi doluysa */}
        {books.map((book) => (
          <BookCard
            editBackground={editBackground}
            key={book.id}
            handleModal={handleModal}
            handleRead={handleRead}
            handleEditModal={handleEditModal}
            data={book}
          />
        ))}
      </main>

      {/* modallar */}

      {/* koşullu renderlama yapıyoruz */}
      {showDelete && (
        <DeleteModal
          setShowDelete={setShowDelete}
          handleDelete={handleDelete}
        />
      )}
      {showEdit && (
        <EditModal
          editingItem={editingItem}
          setShowEdit={setShowEdit}
          updateItem={updateItem}
          setEditingItem={setEditingItem}
        />
      )}
      <div className=" text-center mt-5">
        <button
          setEditBackground={setEditBackground}
          onClick={() => handleBackground()}
          className={editBackground ? "btn btn-light" : "btn btn-dark"}
        >
          {editBackground ? "Light Mod" : "Dark Mod"}
        </button>
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
