import {fileURLToPath} from 'url';
import { dirname } from 'path';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


export default __dirname;
//LA RUTA ABSOLUTA ES PARA QUE NO IMPORTA EN EL NIVEL DE CARPETAS QUE ESTOY LLAMANDO SIEMPRE LA ENCUENTRE