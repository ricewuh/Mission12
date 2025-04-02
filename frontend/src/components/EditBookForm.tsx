import { useState } from "react";
import { Book } from "../types/Book";
import { addBook } from '../api/ProjectsAPI';


function EditBookForm({ book, onSave }: { book: Book; onSave: () => void }) {
  const [formData, setFormData] = useState<Book>(book);

  const handleUpdate = async () => {
    await fetch(`https://localhost:5000/Book/${formData.bookId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    onSave();
  };

  return (
    <div>
      <input value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} />
      {/* Repeat inputs for other fields */}
      <button onClick={handleUpdate}>Save</button>
    </div>
  );
}

export default EditBookForm;
