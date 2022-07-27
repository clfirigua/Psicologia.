import {notConfirmar} from "../../components/alerts.js";
import { addData,onGetData,deleteData, getData, updateData } from "../../services/crudservice.js";
import { menu } from "../../shared/menu.js";
import {validarSession} from "../../components/validador.js"

menu();
validarSession(); 

