import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState=(props)=>{
  const host="http://localhost:5000"
  const notesInitial=[]
  const [notes, setNotes] = useState(notesInitial)

      // Get all note
      const getNotes= async ()=>{
          // API CALL
          const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY3YmVlODdhMjY4MWIzNjk0NWE2NmM4In0sImlhdCI6MTcxOTQxNDczMn0.67qSUehRs_A617pwEJabZgk0ocYaUba26M6tS1kegsQ"
            }
            
          });
          const json=await response.json()
          setNotes(json)
      }


      // Add a note
      const addNote= async (title, description, tag)=>{
          // API CALL
          const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY3YmVlODdhMjY4MWIzNjk0NWE2NmM4In0sImlhdCI6MTcxOTQxNDczMn0.67qSUehRs_A617pwEJabZgk0ocYaUba26M6tS1kegsQ"
  
            },
            body: JSON.stringify({title, description, tag})
          });

          const note=await response.json()
          setNotes(notes.concat(note))
      }

     
     
      // Delete a note
      

      const deleteNote= async (id)=>{

        // API CALL
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY3YmVlODdhMjY4MWIzNjk0NWE2NmM4In0sImlhdCI6MTcxOTQxNDczMn0.67qSUehRs_A617pwEJabZgk0ocYaUba26M6tS1kegsQ"

          },
        });
        const json=response.json();
        console.log(json)

        const newNotes= notes.filter((note)=>{ return note._id!==id})
        setNotes(newNotes)
      }


      // Edit a note

      const editNote=async (id, title, description, tag)=>{

        // API CALL
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY3YmVlODdhMjY4MWIzNjk0NWE2NmM4In0sImlhdCI6MTcxOTQxNDczMn0.67qSUehRs_A617pwEJabZgk0ocYaUba26M6tS1kegsQ"

          },
          body: JSON.stringify({title, description, tag})
        });
        const json= await response.json();
        console.log(json)

        let newNotes= JSON.parse(JSON.stringify(notes))

        // LOGIC TO EDIT IN CLIENT
        for (let index = 0; index < newNotes.length; index++) {
          const element = newNotes[index];
          if(element._id === id){
            newNotes[index].title=title
            newNotes[index].description=description
            newNotes[index].tag=tag
            break;
          }

      
        }
        setNotes(newNotes);
      }

    
    return (
        <NoteContext.Provider value={{notes, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    )

}

export default NoteState;


// import { useState } from "react";
// import NoteContext from "./noteContext";

// const NoteState=(props)=>{

//     const s1={
//         name: "Mahek",
//         class: "10b"
//     }

//     const [state, setState] = useState(s1);
//     const update=()=>{
//         setTimeout(() => {
//             setState({
//                 name: "Komal",
//                 class: "8b"
//             })
            
//         }, 1000);
//     }
//     return (
//         <NoteContext.Provider value={{state, update}}>
//             {props.children}
//         </NoteContext.Provider>
//     )

// }

// export default NoteState;