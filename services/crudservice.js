import {db,addDoc,collection, onSnapshot} from "./firebaseservice.js";


// Data real time
const onGetData = (data,nameCollection) => onSnapshot(collection(db, nameCollection), data);

// agregar Data
const addData = (obj,nameCollection) => addDoc(collection(db, nameCollection), obj );

/*borrar usuarios */
const deleteData = (id, nameCollection ) => deleteDoc(doc(db,nameCollection, id));

/*obtener informacion del usuario */
const getData = (id,nameCollection) => getDoc(doc(db, nameCollection, id));

/*actualizar usuario */
const updateData = (id, newFields) => updateDoc(doc(db, "Usuarios", id), newFields);

export{
    onGetData,
    deleteData,
    getData,
    updateData,
    addData
}