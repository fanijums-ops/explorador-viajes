/* =========================================
   EXPLORADOR DE VIAJES
   Archivo principal de la aplicación
========================================= */


/* =========================================
   IMPORTACIONES
========================================= */
import {
    obtenerPaises
} from "./api/countriesApi.js";


import {
    mostrarCargando,
    mostrarError,
    renderPaises,
    actualizarContador,
    mostrarDetalle,
    cerrarDetalle
} from "./ui/ui.js";


import {
    crearMapa,
    destruirMapa
} from "./ui/mapUI.js";


import {
    procesarPaises
} from "./utils/filters.js";


/* =========================================
   ESTADO DE LA APLICACIÓN
========================================= */

let paises = [];


/* =========================================
   REFERENCIAS DEL DOM
========================================= */

const destinationsContainer =
    document.querySelector(
        "#destinations-container"
    );

const resultsCount =
    document.querySelector(
        "#results-count"
    );
    const searchInput =
    document.querySelector(
        "#search-input"
    );

const continentFilter =
    document.querySelector(
        "#continent-filter"
    );

const sortFilter =
    document.querySelector(
        "#sort-filter"
    );

const detailModal =
    document.querySelector(
        "#detail-modal"
    );

const detailModalContent =
    document.querySelector(
        "#detail-modal-content"
    );
/* =========================================
   BUSCAR PAÍS POR CÓDIGO
========================================= */

function obtenerPaisPorCodigo(
    codigo
) {

    return paises.find(
        (pais) =>
            pais.codes?.alpha_3 === codigo
    );

}
    //APLICAR FILTROS 
function aplicarFiltros() {
const texto = searchInput.value;
const continente = continentFilter.value;
const criterioOrden =sortFilter.value;

//procesar los paises 
const resultados = procesarPaises(paises, texto, continente, criterioOrden);

//RENDERIZAR PAISES 
renderPaises(resultados, destinationsContainer);
actualizarContador(resultados.length, resultsCount);
}
//ABRIR DETALLE DEL DESTINO

function abrirDetalle(codigo){
const pais = obtenerPaisPorCodigo(codigo);

if(!pais){
    console.warn("País no encontrado");
    return;
}

//MOSTRAR DETALLE 
const datosMapa = mostrarDetalle(pais, detailModal, detailModalContent);
setTimeout(() => {
    crearMapa(
        datosMapa.latitud,
        datosMapa.longitud,
        datosMapa.nombre
    );
}, 0);
}

//CERRAR MODEL DE DETALLE 
function cerrarModalDetalle(){
    destruirMapa();
    cerrarDetalle(detailModal,detailModalContent);
}


//REGISTRAR EVENTOS 
function registrarEventos() {
    //BUSQUEDA EN TIEMPO REAL
    searchInput.addEventListener('input', aplicarFiltros);

    //FILTRO POR CONTINENTE 
    continentFilter.addEventListener('change', aplicarFiltros);
    
    //ORDENAMIENTO 
    sortFilter.addEventListener('change', aplicarFiltros);

    /* =====================================
       ACCIONES DE LAS TARJETAS
    ====================================== */

    destinationsContainer.addEventListener(
        "click",
        (event) => {

            const boton =
                event.target.closest(
                    "[data-action]"
                );


            if (!boton) {

                return;

            }


            const accion =
                boton.dataset.action;

            const codigo =
                boton.dataset.countryCode;


            if (accion === "detail") {

                abrirDetalle(
                    codigo
                );

            }

        }
    );


    /* =====================================
       CERRAR MODAL
    ====================================== */

    detailModal.addEventListener(
        "click",
        (event) => {

            if (
                event.target.id ===
                "btn-close-detail"
            ) {

                cerrarModalDetalle();

                return;

            }


            if (
                event.target ===
                detailModal
            ) {

                cerrarModalDetalle();

            }

        }
    );


    /* =====================================
       CERRAR MODAL CON ESCAPE
    ====================================== */

    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Escape" &&
                !detailModal.classList.contains(
                    "hidden"
                )
            ) {

                cerrarModalDetalle();

            }

        }
    );

}


/* =========================================
   INICIALIZACIÓN DE LA APLICACIÓN
========================================= */

/* =========================================
   INICIAR APLICACIÓN
========================================= */

async function init() {

    console.log(
        "Explorador de Viajes iniciado"
    );


    /* =====================================
       MOSTRAR ESTADO DE CARGA
    ====================================== */

    mostrarCargando(
        destinationsContainer
    );


    /* =====================================
       OBTENER PAÍSES
    ====================================== */

    paises =
        await obtenerPaises();


    /* =====================================
       COMPROBAR RESULTADOS
    ====================================== */

    console.log(
        "Países obtenidos:",
        paises
    );


    /* =====================================
       VALIDAR API
    ====================================== */

    if (paises.length === 0) {

        mostrarError(
            destinationsContainer
        );

        actualizarContador(
            0,
            resultsCount
        );

        return;

    }


    /* =====================================
       MOSTRAR RESULTADOS
    ====================================== */

    aplicarFiltros();


    /* =====================================
       REGISTRAR EVENTOS
    ====================================== */

    registrarEventos();

}


/* =========================================
   INICIAR APLICACIÓN
========================================= */

init();