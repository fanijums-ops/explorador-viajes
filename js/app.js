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
    obtenerFavoritos,
    agregarFavorito,
    eliminarFavorito,
    esFavorito
} from "./services/favoritesService.js";

import {
    mostrarCargando,
    mostrarError,
    renderPaises,
    actualizarContador,
    mostrarDetalle,
    cerrarDetalle,
    mostrarFavoritosVacios
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

let vistaActual =
    "explorar";


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

    const searchForm =
    document.querySelector(
        "#search-form"
    );

    const btnExplorar =
    document.querySelector(
        "#btn-explorar"
    );
    
    const btnFavoritos =
    document.querySelector(
        "#btn-favoritos"
    );

    const sectionTitle =
    document.querySelector(
        "#section-title"
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

/* =========================================
   ACTUALIZAR NAVEGACIÓN
========================================= */

function actualizarNavegacion() {

    if (
        vistaActual === "explorar"
    ) {

        btnExplorar.className = `
            px-4
            py-2
            bg-blue-600
            text-white
            rounded-lg
            font-medium
            cursor-pointer
            hover:bg-blue-700
            transition
        `;

        btnFavoritos.className = `
            px-4
            py-2
            bg-white
            text-slate-700
            border
            border-slate-300
            rounded-lg
            font-medium
            cursor-pointer
            hover:bg-slate-100
            transition
        `;

    } else {

        btnExplorar.className = `
            px-4
            py-2
            bg-white
            text-slate-700
            border
            border-slate-300
            rounded-lg
            font-medium
            cursor-pointer
            hover:bg-slate-100
            transition
        `;

        btnFavoritos.className = `
            px-4
            py-2
            bg-blue-600
            text-white
            rounded-lg
            font-medium
            cursor-pointer
            hover:bg-blue-700
            transition
        `;

    }

}

    //APLICAR FILTROS 
function aplicarFiltros() {
    if (
        vistaActual !== "explorar"
    ) {

        return;

    }    
const texto = searchInput.value;
const continente = continentFilter.value;
const criterioOrden =sortFilter.value;

//procesar los paises 
const resultados = procesarPaises(paises, texto, continente, criterioOrden);

renderPaises(resultados, destinationsContainer);
actualizarContador(resultados.length, resultsCount);
}

/* =========================================
   MOSTRAR VISTA EXPLORAR
========================================= */
function mostrarExplorar() {

    vistaActual =
        "explorar";


    sectionTitle.textContent =
        "Destinos";


    searchForm.classList.remove(
        "hidden"
    );


    actualizarNavegacion();


    aplicarFiltros();

}

/* =========================================
   MOSTRAR VISTA FAVORITOS
========================================= */

function mostrarFavoritos() {

    vistaActual =
        "favoritos";


    sectionTitle.textContent =
        "Mis favoritos";


    searchForm.classList.add(
        "hidden"
    );


    actualizarNavegacion();


    const favoritos =
        obtenerFavoritos();


    if (
        favoritos.length === 0
    ) {

        mostrarFavoritosVacios(
            destinationsContainer
        );

        actualizarContador(
            0,
            resultsCount
        );

        return;

    }


    renderPaises(
        favoritos,
        destinationsContainer,
        "favoritos"
    );


    actualizarContador(
        favoritos.length,
        resultsCount
    );

}

/* =========================================
   AGREGAR DESTINO A FAVORITOS
========================================= */

function manejarAgregarFavorito(
    codigo
) {

    const pais =
        obtenerPaisPorCodigo(
            codigo
        );


    if (!pais) {

        return;

    }


    if (
        esFavorito(
            codigo
        )
    ) {

        Swal.fire({
            icon: "info",
            title: "Ya está en favoritos",
            text:
                "Este destino ya había sido guardado."
        });

        return;

    }


    const agregado =
        agregarFavorito(
            pais
        );


    if (agregado) {

        Swal.fire({
            icon: "success",
            title: "Destino guardado",
            text:
                `${pais.names?.common ?? "El destino"} fue agregado a favoritos.`,
            timer: 1800,
            showConfirmButton: false
        });

    }

}


/* =========================================
   ELIMINAR DESTINO DE FAVORITOS
========================================= */

async function manejarEliminarFavorito(
    codigo
) {

    const pais =
        obtenerPaisPorCodigo(
            codigo
        );


    if (!pais) {

        return;

    }


    const resultado =
        await Swal.fire({
            icon: "warning",
            title: "Eliminar favorito",
            text:
                `¿Deseas eliminar ${pais.names?.common ?? "este destino"} de tus favoritos?`,
            showCancelButton: true,
            confirmButtonText: "Eliminar",
            cancelButtonText: "Cancelar",
            confirmButtonColor: "#dc2626"
        });


    if (!resultado.isConfirmed) {

        return;

    }


    eliminarFavorito(
        codigo
    );


    mostrarFavoritos();


    Swal.fire({
        icon: "success",
        title: "Favorito eliminado",
        timer: 1500,
        showConfirmButton: false
    });

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

    /* =====================================
       EVITAR ENVÍO DEL FORMULARIO
    ====================================== */

    searchForm.addEventListener(
        "submit",
        (event) => {

            event.preventDefault();

        }
    );
}

    //BUSQUEDA EN TIEMPO REAL
    searchInput.addEventListener('input', aplicarFiltros);

    //FILTRO POR CONTINENTE 
    continentFilter.addEventListener('change', aplicarFiltros);
    
    //ORDENAMIENTO 
    sortFilter.addEventListener('change', aplicarFiltros);

  /* =====================================
       NAVEGACIÓN - EXPLORAR
    ====================================== */

    btnExplorar.addEventListener(
        "click",
        mostrarExplorar
    );

      /* =====================================
       NAVEGACIÓN - FAVORITOS
    ====================================== */

    btnFavoritos.addEventListener(
        "click",
        mostrarFavoritos
    );

 

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
                return;

            }
    if (accion === "favorite") {
      manejarAgregarFavorito(codigo);
      return;
    }
    if (accion === "remove-favorite") {
      manejarEliminarFavorito(codigo);
    }
  });


                
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