import { useState } from "react";

import "./App.css";

function App() {
   // state of all notes
   const [note, setNote] = useState([]);
   const [edit, setEdit] = useState(false);
   const [value, setValue] = useState(false);

   // handle input field on submit
   const handleNotes = (e) => {
      e.preventDefault();
      if (e.target[0].value === "") return;

      setNote([
         ...note,
         {
            value: e.target[0].value,
            status: false,
         },
      ]);

      // reset input field
      e.target[0].value = "";
   };

   // handle delete notes
   const handleDelete = (index) => {
      // console.log("clicked");
      note.splice(index, 1);
      setNote([...note]);
   };
   return (
      <div className="container mx-auto mt-6 flex flex-col items-center w-3/12">
         <h1 className="text-7xl mb-6 text-gray-300">just do...</h1>
         <form className="min-w-full" onSubmit={handleNotes}>
            <input
               className="border min-w-full pl-12 pr-6 py-3 shadow-lg outline-none placeholder:italic"
               type="text"
               placeholder="Enter tasks..."
            />
         </form>
         <div className="notes-ul min-w-full bg-white">
            {note.map((item, index) => (
               // console.log(item.value);
               <li
                  className="list-none min-w-full border pr-6 py-2 flex justify-between text-gray-600"
                  key={index}
               >
                  <div className="li-left flex">
                     <div className="status-btn pl-4 pr-4 text-gray-100 hover:cursor-pointer hover:text-green-300">
                        <i className="bi bi-circle-fill"></i>
                     </div>
                     <div className="note-wrap"> {item.value}</div>
                  </div>

                  <div
                     className="del-btn text-gray-200 hover:cursor-pointer hover:text-rose-400"
                     onClick={() => {
                        handleDelete(index);
                     }}
                  >
                     <i className="bi bi-x-circle"></i>
                  </div>
               </li>
            ))}
         </div>
      </div>
   );
}

export default App;
