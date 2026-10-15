//ESTADO DE LA APLICACION 
let paises =[]
// 

//REFERENCIAS DEL DOM 
const destinationContainer = document.querySelector('#destinations-container')
const resultsCount = document.querySelector('#results-count')
const initialMessage = document.querySelector('#initial-message')

//inicialización de la aplicación
function init() {

    console.log("Explorador de Viajes iniciado");

    resultsCount.textContent = "0 destinos";

}

//INICIAR APLICACION
init();