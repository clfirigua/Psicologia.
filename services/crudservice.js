import {db,addDoc,collection, onSnapshot, getDoc,doc,deleteDoc, updateDoc,arrayUnion, arrayRemove} from "./firebaseservice.js";


// Data real time
const onGetData = (data,nameCollection) => onSnapshot(collection(db, nameCollection), (data));

//data real time one
const onGetDocument = (nameCollection,id) =>onSnapshot(doc(db,nameCollection,id),(doc));

// agregar Data
const addData = (obj,nameCollection) => addDoc(collection(db, nameCollection), obj );

/*borrar usuarios */
const deleteData = (id, nameCollection ) => deleteDoc(doc(db,nameCollection, id));

/*obtener informacion del usuario */
const getData = (id,nameCollection) => getDoc(doc(db, nameCollection, id));

/*actualizar  */
const updateData = (id, newFields, nameCollection) => updateDoc(doc(db, nameCollection, id), newFields);



export{
    onGetData,
    onGetDocument,
    deleteData,
    getData,
    updateData,
    addData,
    arrayUnion,
    arrayRemove,
    doc,
    db,
    onSnapshot
}