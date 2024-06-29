import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState=(props)=>{
    const notesInitial=[
        {
          "_id": "667c728fe89aaf5ebd76847a",
          "user": "667bee87a2681b36945a66c8",
          "title": "My title",
          "description": "Please buy groceries",
          "tag": "Daily",
          "date": "2024-06-26T19:57:03.506Z",
          "__v": 0
        },
        {
          "_id": "667d141c238efd02e295cd25",
          "user": "667bee87a2681b36945a66c8",
          "title": "New Note Updated2",
          "description": "Please access the updated playlist",
          "tag": "Work",
          "date": "2024-06-27T07:26:20.604Z",
          "__v": 0
        },
        {
          "_id": "667c728fe89aaf5ebd76847a",
          "user": "667bee87a2681b36945a66c8",
          "title": "My title",
          "description": "Please buy groceries",
          "tag": "Daily",
          "date": "2024-06-26T19:57:03.506Z",
          "__v": 0
        },
        {
          "_id": "667d141c238efd02e295cd25",
          "user": "667bee87a2681b36945a66c8",
          "title": "New Note Updated2",
          "description": "Please access the updated playlist",
          "tag": "Work",
          "date": "2024-06-27T07:26:20.604Z",
          "__v": 0
        },
        {
          "_id": "667c728fe89aaf5ebd76847a",
          "user": "667bee87a2681b36945a66c8",
          "title": "My title",
          "description": "Please buy groceries",
          "tag": "Daily",
          "date": "2024-06-26T19:57:03.506Z",
          "__v": 0
        },
        {
          "_id": "667d141c238efd02e295cd25",
          "user": "667bee87a2681b36945a66c8",
          "title": "New Note Updated2",
          "description": "Please access the updated playlist",
          "tag": "Work",
          "date": "2024-06-27T07:26:20.604Z",
          "__v": 0
        },
        {
          "_id": "667d141c238efd02e295cd25",
          "user": "667bee87a2681b36945a66c8",
          "title": "New Note Updated2",
          "description": "Please access the updated playlist",
          "tag": "Work",
          "date": "2024-06-27T07:26:20.604Z",
          "__v": 0
        }
      ]

      const [notes, setNotes] = useState(notesInitial)

    

    
    return (
        <NoteContext.Provider value={{notes, setNotes}}>
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