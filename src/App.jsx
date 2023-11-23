import { useState } from "react";

import "./App.css";

function App() {
   // state of all notes
   const [notes, setNotes] = useState([]);
   const [edit, setEdit] = useState(false);
   const [value, setValue] = useState(false);

   // handle input field on submit
   const handleNotes = (e) => {
      e.preventDefault();
      if (e.target[0].value === "") return;

      setNotes([
         ...notes,
         {
            value: e.target[0].value,
            status: false,
         },
      ]);

      // reset input field after new input value
      e.target[0].value = "";
   };

   // handle delete notes
   const handleDelete = (index) => {
      // console.log("clicked");
      notes.splice(index, 1);
      setNotes([...notes]);
   };

   // handle change status to done, vice versa
   const handleStatus = (index) => {
      notes[index].status = !notes[index].status;
      setNotes([...notes]);
   };

   const handleEdit = () => {
      if (typeof edit === "number") {
         // prevent for saving empty notes
         if (value === "") return;
         notes[edit].value = value;
         setNotes([...notes]);
         setEdit(null);
      }
   };

   return (
      <div className="container mx-auto mt-6 flex flex-col items-center  max-w-lg bg-slate-50">
         <h1 className="text-7xl mb-6 text-gray-300">just do...</h1>
         <form className="min-w-full pb-1" onSubmit={handleNotes}>
            <input
               className="border border-b-2 min-w-full pl-12 pr-6 py-3 outline-none placeholder:italic"
               type="text"
               placeholder="Enter tasks..."
            />
         </form>
         <div className="notes-ul min-w-full bg-slate-50 flex flex-col gap-1 bg-gra">
            {notes.map((item, index) => (
               <li
                  className="list-none min-w-full border pr-6 py-2 flex justify-between text-gray-600 bg-white last:shadow-xl"
                  key={index}
               >
                  <div className="li-left flex w-full">
                     <div
                        className="status-btn pl-4 pr-5 text-gray-100 hover:cursor-pointer hover:text-green-300"
                        // * change notes style on notes status change by pressing
                        style={{ color: item.status && "#86efac" }}
                        onClick={() => handleStatus(index)}
                     >
                        <i className="bi bi-circle-fill"></i>
                     </div>
                     {/* if edit is number and that number === index value, enable edit note form */}
                     {typeof edit === "number" && edit === index ? (
                        <form
                           className="w-full mr-4"
                           onSubmit={(e) => {
                              e.preventDefault();
                              handleEdit();
                           }}
                        >
                           <input
                              type="text"
                              className="form-control w-full outline-none"
                              // sets value = to input value
                              value={value}
                              onChange={(e) => {
                                 // passes target value
                                 setValue(e.target.value);
                              }}
                           />
                        </form>
                     ) : (
                        <div
                           // * change notes className on notes status change by pressing
                           className={
                              item.status
                                 ? "text-gray-400 line-through w-full"
                                 : "w-full"
                           }
                           onClick={() => {
                              // onClick pass index to edit and note value
                              setEdit(index);
                              setValue(item.value);
                           }}
                        >
                           {item.value}
                        </div>
                     )}
                  </div>

                  <div
                     className="del-btn text-gray-200 hover:cursor-pointer hover:text-rose-400"
                     onClick={() => handleDelete(index)}
                  >
                     <i className="bi bi-x-circle"></i>
                  </div>
               </li>
            ))}
         </div>
         <div className="foot-wrap text-sm text-gray-400 mt-8">
            <p>Press Enter to save notes</p>
            <p>Mouse click to edit notes</p>
         </div>
      </div>
   );
}

export default App;
